import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Sensor} from '../../../models/sensor.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-sensor-grid',
  templateUrl: './sensor-grid.component.html',
  styleUrls: ['./sensor-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorGridComponent implements OnInit, OnChanges {

  @Input() sensors: Sensor[];
  tableColumns: string[];
  dataSource: MatTableDataSource<Sensor>;

  constructor() { }

  ngOnInit() {
    this.tableColumns = ['name', 'image', 'path', 'unitSymbol', 'value', 'lastUpdate', 'type'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Sensor>();
    this.dataSource.data = this.sensors;
  }
}
