import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../Services/user/user-service.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskUpdateForm!: FormGroup;
  users: User[] = [];
  taskId = '';

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.taskUpdateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
      dueDate: ['', [Validators.required]],
      assignedUsers: [[]]
    });

    this.route.params.subscribe((params) => {
      this.taskId = params['id'];
      this.taskService.taskDetails(this.taskId).subscribe((task) => {
        this.taskUpdateForm.patchValue(task);
        this.taskUpdateForm.get('assignedUsers')!.patchValue(task.assignedUsers);
      });
    });

    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  assignUserToTask(user: User): void {
    const assignedUsers = this.taskUpdateForm.get('assignedUsers') as any;

    // Check if the user is already assigned
    if (!assignedUsers.value.some((assignedUser: User) => assignedUser.id === user.id)) {
      // If not assigned, add to the assigned users
      assignedUsers.setValue([...assignedUsers.value, user]);
    }
  }

  removeUserFromTask(user: User): void {
    const assignedUsers = this.taskUpdateForm.get('assignedUsers') as any;

    // Remove the user from the assigned users
    assignedUsers.setValue(assignedUsers.value.filter((assignedUser: User) => assignedUser.id !== user.id));
  }

  onSubmit(): void {
    if (this.taskUpdateForm.valid) {
      const updatedTask = this.taskUpdateForm.value;

      this.taskService.editTask(this.taskId, updatedTask).subscribe(
        (response) => {
          console.log('Task Updated Successfully', response);
          this.router.navigate(['/tasks', this.taskId]);
        },
        (error) => {
          console.log('Error updating task', error);
        }
      );
    }
  }
}
