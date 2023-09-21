import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../../models/task/task";
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url:string;
  constructor(private http:HttpClient) {
    this.url='http://localhost:8080/api/tasks'
  }
  public findAllTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.url)
  }
  public getAssignedUsers(taskId:number):Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/tasks/${taskId}/assigned-users`)
  }
  public searchTask(searchTerm:string):Observable<Task[]>{
    return this.http.get <Task[]>(`${this.url}/search?searchTerm=${searchTerm}`)
  }
  public taskDetails(taskId:string):Observable<Task>{
    const taskurl=`${this.url}/${taskId}`
    return this.http.get<Task>(taskurl)
  }
  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

}
