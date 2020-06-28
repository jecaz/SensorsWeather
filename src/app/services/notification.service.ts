import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBarConfig: MatSnackBarConfig;
  private snackBarAutoHide = '5000';

  constructor(private sb: MatSnackBar) {}

  openSnackBar(message: string, action: string, className: string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = [className];
    this.snackBarConfig.verticalPosition = 'top';
    this.snackBarConfig.horizontalPosition = 'right';
    this.sb.open(message, action, this.snackBarConfig);
  }
}
