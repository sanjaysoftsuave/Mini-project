import { Component,OnInit } from '@angular/core';
import { FormService } from '../_services/form.service';

@Component({
  selector: 'app-public-task',
  templateUrl: './public-task.component.html',
  styleUrls: ['./public-task.component.scss']
})
export class PublicTaskComponent implements OnInit {
  username = '';
  publicTasks : any[] = [];

  constructor(private formService: FormService) {
    this.username = this.formService.username;
  }

  ngOnInit(): void {
    this.fetchPublicTasks();
  }

  fetchPublicTasks() {
    this.formService.getTasks().subscribe({
      next:(res) => {
        this.publicTasks = res.publicTasks;
      },
      error:(error) => {
        console.log("Error fetching tasks ", error);
      }
    })
  }
}
