import {NgModule} from '@angular/core';
import {SensorNewComponent} from './sensor-new.component';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    SensorNewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [SensorNewComponent],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class SensorNewModule {
}
