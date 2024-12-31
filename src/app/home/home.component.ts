import { Component,OnInit  } from '@angular/core';
import { FormService } from '../_services/form.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatdialogComponent } from '../matdialog/matdialog.component';


// import { MatDialog } from '@angular/material/dialog';
// import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = this.formService.username
  taskItem = {task : '', status : false, isPublic: false}
  taskList: any[] = []

  editIndex : number | null = null;

  constructor(private formService: FormService, private router : Router, private dialog: MatDialog) {

  }

  openEditDialog(task: any, index: number): void {
    const dialogRef = this.dialog.open(MatdialogComponent, {
      width: '400px',
      data: { task: task.task, status: task.status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update(index, result);
      }
    });
  }

  update(index: number, updatedTask: any): void {
    this.taskList[index] = updatedTask;
    this.formService.updateTask(index, updatedTask).subscribe({
      next: (res: any) => {
        console.log(res)
        this.getList()
      },
      error: (err : any) => {
        console.log(err)
      }
    })
  }


  deleteTask(index: number) {
    this.formService.delete(index).subscribe({
      next: (res) => {
        console.log(res)
        this.getList()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getList() {
    this.formService.getTasks().subscribe({
      next: (res) => {
        this.taskList = res.userTasks
      },
      error: (err) => {
        alert("Oops! Something went wrong...")
      }
    })
  }

  ngOnInit(): void {
      this.getList()
  }

  add() {
    this.formService.addTask(this.taskItem).subscribe({
      next: (res) => {
        this.getList()
        this.taskItem = {task : '', status : false, isPublic: false}
      },
      error: (err) => {
        console.log(err, "<= Error")
      }
    })
  }


  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("jwt");
    this.formService.isAuthenticated = false;
    this.formService.username = ''
    this.router.navigate(['/login'])
  }
}

