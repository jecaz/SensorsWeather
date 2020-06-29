import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [DialogComponent]
})
export class DialogModule {
}
