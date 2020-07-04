import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../../models/sensor.model';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Pageable} from '../../../models/pageable.model';
import {Observable, Subscription} from 'rxjs/index';
import * as SensorActions from '../../../store/actions/sensor.action';
import * as fromSensors from '../../../store/selectors/sensors.selectors';
import SensorState from '../../../store/states/sensor.state';
import {select, Store} from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sensor-grid',
  templateUrl: './sensor-grid.component.html',
  styleUrls: ['./sensor-grid.component.scss'],
})
export class SensorGridComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tableColumns: string[];
  dataSource: MatTableDataSource<Sensor>;
  totalRecords: number;
  defaultPageIndex: number;
  defaultPageSize: number;
  filterValue: string;
  subscriptions: Subscription[] = [];
  sensors$: Observable<SensorState>;

  constructor(private store: Store<{sensors: SensorState}>) {
    this.sensors$ = store.pipe(select(fromSensors.selectSensorsCollection));
  }

  ngOnInit() {
    this.defaultPageIndex = 1;
    this.defaultPageSize = 5;
    this.tableColumns = ['name', 'image', 'path', 'unitSymbol', 'value', 'lastUpdate', 'type'];
    this.dataSource = new MatTableDataSource<Sensor>();
    this.setSort();
    this.sub = this.sensors$
      .pipe(
        map(x => {
          this.dataSource.data = x.Sensors;
          this.totalRecords = x.Sensors[0].totalSensorCount;
        })
      ).subscribe();
    const pagination = this.getPagination(this.defaultPageIndex, this.defaultPageSize);
    this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: pagination }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub ? sub.unsubscribe() : null);
  }

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  setSort() {
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'name', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  onPage(event) {
    const pagination = this.getPagination(++event.pageIndex, event.pageSize);
    this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: pagination }));
  }

  getPagination(pateIndex: number, pageSize: number) {
    return new Pageable(pateIndex, pageSize);
  }

  filterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
