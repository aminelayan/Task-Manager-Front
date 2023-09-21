import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../Services/user/user-service.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user/user";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  user:User=new User();
  userId: string='';
  constructor(private userService:UserServiceService,private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.fetchUserDetails(this.userId);
    });
  }

  fetchUserDetails(userId: string): void {
    this.userService.userDeatails(userId).subscribe((user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
