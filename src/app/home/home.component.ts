import { Component,OnInit  } from '@angular/core';
import { FormService } from '../_services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = this.formService.username
  taskItem = {task : '', status : false}
  taskList: any[] = []

  constructor(private formService: FormService) {

  }

  getList() {
    this.formService.getTasks().subscribe({
      next: (res) => {
        this.taskList = res
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
        // alert("Added ")
      },
      error: (err) => {
        console.log(err, "<= Error")
      }
    })
  }


}
