import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-matdialog',
  templateUrl: './matdialog.component.html',
  styleUrls: ['./matdialog.component.scss']
})
export class MatdialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MatdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder)
  {
      this.taskForm = this.fb.group({
      task: [this.data.task, []],
      status: [this.data.status, []]
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
      console.log(this.taskForm.value)
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
