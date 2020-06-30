import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SensorsService} from '../../services/sensors.service';
import {MatDialog, MatSidenav} from '@angular/material';
import {DialogComponent} from '../../common/dialog/dialog.component';
import {Subscription} from 'rxjs/index';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('editBtn', { static: true }) editButton: any;
  @ViewChild('deleteBtn', { static: true }) deleteButton: any;
  selectedSensorId: any;
  subscriptions: Subscription[] = [];

  constructor(private sensorService: SensorsService,
              private cdref: ChangeDetectorRef,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.isDisabledButtons(true);
    this.sub = this.sensorService.getSelectedSensor().subscribe(sensorId => {
      if (sensorId) {
        this.selectedSensorId = sensorId;
        this.isDisabledButtons(false);
        this.cdref.detectChanges();
        return;
      }
      this.selectedSensorId = '';
      this.isDisabledButtons(true);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub ? sub.unsubscribe() : null);
  }

  private set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  resetSelectedSensorId() {
    this.selectedSensorId = '';
    this.isDisabledButtons(true);
  }

  isDisabledButtons(isDisabled: boolean) {
    this.editButton._disabled = isDisabled;
    this.deleteButton._disabled = isDisabled;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {title: 'Delete sensor', content: 'Are you sure you want to delete sensor?', accept: 'Ok', reject: 'No'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sensorService.setConfirmedDelete(this.selectedSensorId);
        this.isDisabledButtons(true);
        this.selectedSensorId = '';
      }
    });
  }

  goToEditPage(sidenav: MatSidenav) {
    if (!this.selectedSensorId) {
      this.notificationService.openSnackBar('First select sensor!', 'Close', 'warn');
      return;
    }
    sidenav.toggle();
    this.router.navigate(['../sensor/' + this.selectedSensorId], { relativeTo: this.activeRoute.parent });
  }

  goToDelete(sidenav: MatSidenav) {
    if (!this.selectedSensorId) {
      this.notificationService.openSnackBar('First select sensor!', 'Close', 'warn');
      return;
    }
    sidenav.toggle();
    this.openDialog();
  }
}
