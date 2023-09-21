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
    UserUpdateComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    HttpClientModule,
  ],
  exports:[],
  providers: [ {provide: HTTP_INTERCEPTORS,
  useClass: MyHttpInterceptor,
  multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
