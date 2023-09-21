import { Component,OnInit } from '@angular/core';
import {User} from "../models/user/user";
import {UserServiceService} from "../Services/user/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users:User[]=[];
  constructor(private userService:UserServiceService , private router:Router) {
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.findAll().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully.');

        // Update the user list by filtering out the deleted user
        this.users = this.users.filter((user) => user.id !== userId);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
