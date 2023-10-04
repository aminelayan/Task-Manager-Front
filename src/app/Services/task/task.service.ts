import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
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

  public deleteTask(taskID:string):Observable<any>{
    const taskurl=`${this.url}/${taskID}`
    return this.http.delete(taskurl,this.httpOptions)
  }

  public editTask(taskId:string,task:Task):Observable<any>{
    const taskurl=`${this.url}/${taskId}`
    return this.http.put(taskurl,task)
  }


  assignUserToTask(taskId: string, userId: string): Observable<any> {
    const url = `${this.url}/${taskId}/assign`;
    const params = { userId: userId.toString() };

    return this.http.post(url, null, { params });
  }

  removeUserFromTask(taskId: string, userId: string): Observable<any> {
    const url = `${this.url}/${taskId}/remove/${userId}`;
    return this.http.delete(url);
  }

}
