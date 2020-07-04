import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../../models/sensor.model';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';
import {SensorsService} from '../../../services/sensors.service';
import {Pageable} from '../../../models/pageable.model';
import {Subscription} from 'rxjs/index';

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

  constructor(private sensorService: SensorsService) { }

  ngOnInit() {
    this.defaultPageIndex = 1;
    this.defaultPageSize = 5;
    this.tableColumns = ['name', 'image', 'path', 'unitSymbol', 'value', 'lastUpdate', 'type'];
    this.dataSource = new MatTableDataSource<Sensor>();
    this.setSort();
    const pagination = this.getPagination(this.defaultPageIndex, this.defaultPageSize);
    this.getSensors(pagination);
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
    this.getSensors(pagination);
  }

  getPagination(pateIndex: number, pageSize: number) {
    return new Pageable(pateIndex, pageSize);
  }

  getSensors(pageable: Pageable) {
    this.sub = this.sensorService.getSensors(pageable).subscribe(data => {
      this.dataSource.data = data;
      this.totalRecords = data[0].totalSensorCount;
    });
  }

  filterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
