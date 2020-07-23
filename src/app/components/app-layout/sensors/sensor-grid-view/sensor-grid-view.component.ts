import {Component, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../../../models/sensor.model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Pageable} from '../../../../models/pageable.model';
import {Observable} from 'rxjs/index';
import * as SensorActions from '../../../../store/actions/sensor.action';
import * as fromSensors from '../../../../store/selectors/sensors.selectors';
import SensorState from '../../../../store/states/sensor.state';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {Actions, ofType} from '@ngrx/effects';
import {SensorsService} from '../../../../services/sensors.service';
import {map} from 'rxjs/internal/operators';
import {NotificationService} from '../../../../services/notification.service';
import {SubscribedContainerComponent} from '../../../../common/subscribed-container/subscribed-container.component';

@Component({
  selector: 'app-sensor-grid',
  templateUrl: './sensor-grid-view.component.html',
  styleUrls: ['./sensor-grid-view.component.scss']
})
export class SensorGridViewComponent extends SubscribedContainerComponent implements OnInit {

  sensors: Sensor[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  tableColumns: string[];
  dataSource: MatTableDataSource<Sensor>;
  tableTotalRecords: number;
  defaultPageIndex: number;
  defaultPageSize: number;
  filterValue: string;
  sensors$: Observable<SensorState>;
  selection = new SelectionModel<Sensor>(true, []);
  sortState: Sort;
  pageIndex: number;

  constructor(private store: Store<{sensors: SensorState}>,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private actions$: Actions,
              private sensorService: SensorsService,
              private notificationService: NotificationService) {
    super();
    this.sensors$ = store.pipe(select(fromSensors.selectSensorsCollection));
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Sensor>();
    this.dataSource.data = [];
    this.defaultPageIndex = 1;
    this.defaultPageSize = 5;
    this.tableColumns = ['select', 'name', 'image', 'path', 'unitSymbol', 'value', 'lastUpdate', 'type', 'actions'];
    this.setDefaultSort();
    this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: new Pageable(0, 5, 'name', 'asc') }));
    this.sub = this.sensors$
      .pipe(
        map(x => {
          this.sensors = x.Sensors;
          this.dataSource.data = x.Sensors;
          this.setTableTotalRecords();
        })
      ).subscribe();
    this.sub = this.actions$.pipe(
      ofType(SensorActions.SuccessDeleteSensorAction)
    ).subscribe((deletedSensor: any) => {
      if (this.sensors && this.sensors.length === 0 && this.paginator.pageIndex === 0) {
        this.tableTotalRecords = 0;
      } else if (this.selection.selected) {
        this.tableTotalRecords = this.tableTotalRecords - this.selection.selected.length;
      }
      this.paginator.length = this.tableTotalRecords;
      this.selection.clear();
    });
  }

  setTableTotalRecords(totalRecords?: number) {
    if (this.sensors && this.sensors.length > 0) {
      this.tableTotalRecords = totalRecords ? totalRecords : this.sensors[0].totalSensorCount;
    }
  }

  setDefaultSort() {
    this.sortState = {active: 'name', direction: 'asc'};
    this.sort.active = this.sortState.active;
    this.sort.direction = this.sortState.direction;
  }

  onPage(event) {
    this.pageIndex = ++event.pageIndex;
    const pagination = new Pageable(this.pageIndex, event.pageSize, this.sort.active, this.sort.direction);
    this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: pagination }));
  }

  filterByName() {
    this.setPageableOnFilter('', '');
  }

  resetFilterByName() {
    this.filterValue = '';
    this.setPageableOnFilter(0, 5);
  }

  setPageableOnFilter(pageIndex: any, pageSize: any) {
    const pagination = new Pageable(pageIndex, pageSize, this.sort.active, this.sort.direction, this.filterValue);
    this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: pagination }));
  }

  openDeleteDialog(sensorId): void {
    const dialogRef = this.notificationService.openDeleteDialog();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(SensorActions.BeginDeleteSensorAction({ payload: sensorId }));
      }
    });
  }

  goToPage(selectId?: any) {
    if (selectId || selectId === 0) {
      this.router.navigate(['../sensor/' + selectId], { relativeTo: this.activeRoute.parent });
      return;
    }
    this.router.navigate(['../sensor'], { relativeTo: this.activeRoute.parent });
    this.sensorService.setIsSliderChecked(true);
  }

  isAllTableRowsSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllTableRowsSelected() ? this.selection.clear() :
                                    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Sensor): string {
    if (!row) {
      return `${this.isAllTableRowsSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  deleteAllSelectedSensors() {
    if (this.selection.selected.length === 0) {
      this.notificationService.openSnackBar('Select one or more sensors!', 'Close', 'warn');
      return;
    }
    this.store.dispatch(SensorActions.BeginDeleteSensorAction({ payload: this.selection.selected}));
  }

  sortData(event) {
    this.sortState = {active: event.active, direction: event.direction};
    const pagination = new Pageable(this.pageIndex, this.paginator.pageSize, event.active, event.direction);
    this.store.dispatch(SensorActions.BeginGetSensorsAction({ payload: pagination }));
  }

  getImageUrl(sensorImage: string) {
    return `./../../../assets/${sensorImage}`;
  }
}
