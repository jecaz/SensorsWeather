import {NgModule} from '@angular/core';
import {SensorNewComponent} from './sensor-new.component';
import {
  ErrorStateMatcher, MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule, MatSnackBarModule, ShowOnDirtyErrorStateMatcher
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
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [SensorNewComponent],
  providers: [
    MatDatepickerModule,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class SensorNewModule {
}
