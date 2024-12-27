import { Component,OnInit  } from '@angular/core';
import { FormService } from '../_services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = this.formService.name
  taskItem = {task : '', status : false}
  taskList: any[] = []

  constructor(private formService: FormService) {

  }

  getList() {
    this.formService.getTasks().subscribe({
      next: (res) => {
        console.log(res)
        this.taskList = [...res]
        console.log(this.taskList)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
      this.getList()
  }

  add() {
    this.formService.addTask(this.taskItem).subscribe({
      next: (res) => {
        console.log(res, "<= Response")
        alert("Added ")
      },
      error: (err) => {
        console.log(err, "<= Error")
      }
    })
  }


}
