import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../Services/task/task.service";
import {ActivatedRoute} from "@angular/router";
import {Task} from "../../models/task/task";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  task:Task=new Task()
  taskId:string=''
  constructor(private taskService:TaskService , private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.taskId=params['taskId'];
      this.fetchTaskDetails(this.taskId)
    })

  }

  fetchTaskDetails(taskId:string):void{
    this.taskService.taskDetails(taskId).subscribe((task)=>{
      this.task=task;
    })
  }

}
