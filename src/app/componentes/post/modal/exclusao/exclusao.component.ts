import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exclusao',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './exclusao.component.html',
  styleUrl: './exclusao.component.scss',
})
export class ExclusaoComponent {
  constructor(
    public dialogRef: MatDialogRef<ExclusaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
  }
}
