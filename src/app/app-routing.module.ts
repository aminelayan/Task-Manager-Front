import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {UsersComponent} from "./users/users.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {TaskDetailsComponent} from "./tasks/task-details/task-details.component";
import {TaskCreateComponent} from "./tasks/task-create/task-create.component";
import {UserCreateComponent} from "./users/user-create/user-create.component";
import {UserUpdateComponent} from "./users/user-update/user-update.component";
import {TaskEditComponent} from "./tasks/task-edit/task-edit.component";


const routes: Routes = [
  { path: 'tasks', component:TasksComponent},
  { path: 'tasks/:id/edit', component:TaskEditComponent},
  { path: 'tasks/create', component: TaskCreateComponent },
  { path: 'tasks/:taskId', component:TaskDetailsComponent},
  { path: 'users', component: UsersComponent },
  { path: 'users/:id/edit', component: UserUpdateComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/:userId', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
