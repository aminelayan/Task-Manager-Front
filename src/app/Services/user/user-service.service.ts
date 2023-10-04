import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user/user";
import {Task} from "../../models/task/task";
import {TaskService} from "../task/task.service";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  url:string
  constructor(private http:HttpClient) {
    this.url='http://localhost:8080/api/users'
  }
  getAllUsers(searchTerm?: string): Observable<User[]> {
    const url = `${this.url}?input=${searchTerm || ''}`;
    return this.http.get<User[]>(url);
  }


  public userDeatails(userId:string):Observable<User>{
    const userurl=`${this.url}/${userId}`
    return this.http.get<User>(userurl)
  }
  public createUser(user:User):Observable<User>{
    return this.http.post<User>(this.url,user)
  }
  public deleteUser(userId:string):Observable<any>{
    const userurl=`${this.url}/${userId}`
    return this.http.delete(userurl)
  }
  public editUser(userId:string,user:User):Observable<any>{
    const userurl=`${this.url}/${userId}`
    return this.http.put(userurl,user)
  }
}
