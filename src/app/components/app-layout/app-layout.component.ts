import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SensorsService} from '../../services/sensors.service';
import {MatButton, MatDialog, MatSidenav, MatSlideToggle, MatSlideToggleChange} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {Actions, ofType} from '@ngrx/effects';
import SensorState from '../../store/states/sensor.state';
import {Store} from '@ngrx/store';
import * as SensorActions from '../../store/actions/sensor.action';
import {SubscribedContainerComponent} from '../../common/subscribed-container/subscribed-container.component';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent extends SubscribedContainerComponent implements OnInit, AfterViewInit {

  @ViewChild('editBtn', { static: true }) editButton: MatButton;
  @ViewChild('deleteBtn', { static: true }) deleteButton: MatButton;
  @ViewChild('createBtn', { static: true }) createBtn: MatButton;
  @ViewChild('toggleSlider', { static: true }) toggleSlider: MatSlideToggle;
  selectedSensorId: any;

  constructor(private sensorService: SensorsService,
              private changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private store: Store<{sensors: SensorState}>,
              private actions$: Actions,
              private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.isDisabledButtons(true);
    this.sub = this.sensorService.getSelectedSensor().subscribe(sensorId => {
      if (sensorId) {
        this.setSelectedSensorIdAndButtons(sensorId, false);
        this.changeDetectorRef.detectChanges();
        return;
      }
      this.setSelectedSensorIdAndButtons('', true);
    });
    this.sub = this.actions$.pipe(
      ofType(SensorActions.ErrorSensorAction)
    ).subscribe((error: any) =>
      this.notificationService.openSnackBar(`Error Code: ${error.status}\nMessage: ${error.message}`, '', 'error')
    );
    this.sub = this.actions$.pipe(
      ofType(SensorActions.SuccessDeleteSensorAction)
    ).subscribe((deletedSensor: any) => {
      this.notificationService.openSnackBar('Sensor successfully deleted!', 'Close', 'success');
    });
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('grid')) {
      this.toggleSlider.checked = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  setSelectedSensorIdAndButtons(sensorId: any, isDisabledButtons) {
    this.selectedSensorId = sensorId;
    this.isDisabledButtons(isDisabledButtons);
  }

  isDisabledButtons(isDisabled: boolean) {
    this.editButton.disabled = isDisabled;
    this.deleteButton.disabled = isDisabled;
  }

  openDeleteDialog(): void {
    const dialogRef = this.notificationService.openDeleteDialog();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(SensorActions.BeginDeleteSensorAction({ payload: this.selectedSensorId }));
        this.setSelectedSensorIdAndButtons('', true);
      }
    });
  }

  goToEditPage(sidenav: MatSidenav) {
    sidenav.toggle();
    this.router.navigate(['../sensor/' + this.selectedSensorId], { relativeTo: this.activeRoute.parent });
  }

  goToDelete(sidenav: MatSidenav) {
    sidenav.toggle();
    this.openDeleteDialog();
  }

  goToSensorsViewPage() {
    this.toggleSlider.checked ? this.router.navigate(['/sensors/grid']) : this.router.navigate(['/sensors/card']);
  }

  onToggleSlider(event: MatSlideToggleChange) {
    this.sensorService.setIsSliderChecked(event.checked);
    if (event.checked) {
      this.setButtonsVisibilityAndNavigateToView('hidden', 'grid');
    } else {
      this.setButtonsVisibilityAndNavigateToView('visible', 'card');
    }
  }

  setButtonsVisibilityAndNavigateToView(visibility: string, partOfUrl: string) {
    this.buttonsVisibility(visibility);
    this.router.navigate([`/sensors/${partOfUrl}`]);
  }

  buttonsVisibility(visible: string) {
    this.renderer.setStyle(this.editButton._elementRef.nativeElement, 'visibility', visible);
    this.renderer.setStyle(this.deleteButton._elementRef.nativeElement, 'visibility', visible);
    this.renderer.setStyle(this.createBtn._elementRef.nativeElement, 'visibility', visible);
  }
}
