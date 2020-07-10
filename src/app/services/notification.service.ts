import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {DialogComponent} from '../common/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBarConfig: MatSnackBarConfig;
  private snackBarAutoHide = '5000';

  constructor(private sb: MatSnackBar,
              public dialog: MatDialog) {}

  openSnackBar(message: string, action: string, className: string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = [className];
    this.snackBarConfig.verticalPosition = 'top';
    this.snackBarConfig.horizontalPosition = 'right';
    this.sb.open(message, action, this.snackBarConfig);
  }

  openConfirmationDialog(title: string, content: string, accept: string, reject: string, width: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width,
      data: {title, content, accept, reject}
    });
    return dialogRef;
  }
}
