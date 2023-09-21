import {Component, OnInit} from '@angular/core';
import {TaskService} from "../Services/task/task.service";
import {Task} from "../models/task/task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks:Task[]=[];

  constructor(private taskService:TaskService) {
  }

  ngOnInit() {
    this.taskService.findAllTasks().subscribe(data =>{
      this.tasks=data;
    });
  }
  public getRandomHexColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
