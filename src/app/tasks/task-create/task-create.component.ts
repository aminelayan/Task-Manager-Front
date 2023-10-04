import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/task/task";
import {TaskService} from "../../Services/task/task.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../models/user/user";
import {UserServiceService} from "../../Services/user/user-service.service";


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit{
  taskForm: FormGroup;
  users:User[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private taskService:TaskService,
    private userService:UserServiceService,
    private route:Router
  ) {
    this.taskForm = this.formBuilder.group({
      // Define your form controls here with validators
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
      dueDate: ['', [Validators.required, this.validateDate]],
      assignedUsers: [[]]
    });
  }



  validateDate(control:any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { pastDate: true };
    }

    return null;
  }


  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;

     this.taskService.createTask(formData).subscribe(
        (response) => {
          console.log('Task created:', response);
          this.route.navigate(['/tasks'])

        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }




}

