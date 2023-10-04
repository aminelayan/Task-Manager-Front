import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../Services/task/task.service";
import {ActivatedRoute} from "@angular/router";
import {Task} from "../../models/task/task";
import {User} from "../../models/user/user";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{
  task:Task=new Task()
  taskId:string=''


  usersNotAssignedToTask: User[]=[];
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


  removeUserFromTask(taskId: string, userId: string): void {
    this.taskService.removeUserFromTask(taskId, userId).subscribe(
      () => {
        console.log('User removed successfully');
      },
      (error) => {
        console.error('Error removing user:', error);
      }
    );
  }

  assignUserToTask(userId: string): void {
    this.taskService.assignUserToTask(this.taskId, userId).subscribe(
      () => {
        console.log('User assigned successfully');
        // Reload task details and not assigned users after successful assignment
        this.fetchTaskDetails(this.taskId);
      },
      (error) => {
        console.error('Error assigning user:', error);
      }
    );
  }




}

