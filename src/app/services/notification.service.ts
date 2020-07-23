import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {DialogComponent} from '../common/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBarConfig: MatSnackBarConfig;
  private snackBarAutoHide = '2500';

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.verticalPosition = 'top';
    this.snackBarConfig.horizontalPosition = 'right';
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBarConfig.panelClass = [className];
    this.snackBar.open(message, action, this.snackBarConfig);
  }

  openConfirmationDialog(title: string, content: string, accept: string, reject: string, width: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width,
      data: {title, content, accept, reject}
    });
    return dialogRef;
  }

  openDeleteDialog() {
    const dialogRef = this.openConfirmationDialog('Delete sensor', 'Are you sure you want to delete sensor?',
                                                  'Ok', 'No', '350px');
    return dialogRef;
  }
}
