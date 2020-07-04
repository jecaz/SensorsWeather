import {
  ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Sensor} from '../../../models/sensor.model';
import {MatDialog, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Pageable} from '../../../models/pageable.model';
import {Observable} from 'rxjs/index';
import * as SensorActions from '../../../store/actions/sensor.action';
import * as fromSensors from '../../../store/selectors/sensors.selectors';
import SensorState from '../../../store/states/sensor.state';
import {select, Store} from '@ngrx/store';
import {DialogComponent} from '../../../common/dialog/dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sensor-grid',
  templateUrl: './sensor-grid.component.html',
  styleUrls: ['./sensor-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorGridComponent implements OnInit, OnChanges {

  @Input() sensors: Sensor[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tableColumns: string[];
  dataSource: MatTableDataSource<Sensor>;
  totalRecords: number;
  defaultPageIndex: number;
  defaultPageSize: number;
  filterValue: string;
  sensors$: Observable<SensorState>;

  constructor(private store: Store<{sensors: SensorState}>,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router) {
    this.sensors$ = store.pipe(select(fromSensors.selectSensorsCollection));
  }

  ngOnInit() {
    this.defaultPageIndex = 1;
    this.defaultPageSize = 5;
    this.tableColumns = ['name', 'image', 'path', 'unitSymbol', 'value', 'lastUpdate', 'type', 'actions'];
    this.setSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Sensor>();
    this.dataSource.data = this.sensors;
    this.totalRecords = this.sensors[0].totalSensorCount;
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

  openDialog(sensorId): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {title: 'Delete sensor', content: 'Are you sure you want to delete sensor?', accept: 'Ok', reject: 'No'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(SensorActions.BeginDeleteSensorAction({ payload: sensorId }));
      }
    });
  }

  goToEditPage(selectId) {
    this.router.navigate(['../sensor/' + selectId], { relativeTo: this.activeRoute });
  }
}
