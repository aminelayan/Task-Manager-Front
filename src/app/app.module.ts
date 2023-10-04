import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import { UserDetailsComponent } from './users/user-details/user-details.component';
import {AppRoutingModule} from "./app-routing.module";
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import {MyHttpInterceptor} from "./http-interceptor";
import { UserCreateComponent } from './users/user-create/user-create.component';
import {UsersComponent} from "./users/users.component";
import { UserUpdateComponent } from './users/user-update/user-update.component';
import {MatInputModule} from "@angular/material/input";
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CommonModule, DatePipe} from "@angular/common";

@NgModule({
  declarations:[
    AppComponent,
    HeaderComponent,
    TasksComponent,
    UserDetailsComponent,
    TaskDetailsComponent,
    TaskCreateComponent,
    UserCreateComponent,
    UsersComponent,
    UserUpdateComponent,
    TaskEditComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule
  ],
  exports:[],
  providers: [ {provide: HTTP_INTERCEPTORS,
  useClass: MyHttpInterceptor,
  multi: true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
