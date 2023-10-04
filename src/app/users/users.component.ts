import { Component,OnInit } from '@angular/core';
import {User} from "../models/user/user";
import {UserServiceService} from "../Services/user/user-service.service";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  constructor(private userService:UserServiceService , private router:Router) {
  }

  ngOnInit(): void {
    this.loadUsers(),
    this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.trim() !== "") {
          return this.userService.getAllUsers(term);
        } else {
          // If the search term is empty, return all users
          return this.userService.getAllUsers();
        }
      })
    ).subscribe(users => this.users = users);
  }

  search(): void {
    this.searchTerms.next(this.searchTerm);
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      (res) => {
        console.log('User deleted successfully.',res);
     this.loadUsers()
      }
    );
  }
}
