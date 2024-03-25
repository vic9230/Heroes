import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export interface DialogData {
  title: string;
  text: string;
  button: string;
  password: boolean;
}

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './delete.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FlexModule,
    MatSnackBarModule,
  ],
  styleUrls: ['./delete.component.scss']
})
export class DeleteDialogComponent {
  placeholder = 'Escribe "confirmar"';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    data.button = data?.button ? data?.button : 'Eliminar';
  }

  checkConfirm(msg: string): void {
    if (msg === 'confirmar') {
      this.dialogRef.close(true);
    }
  }

}
