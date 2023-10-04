import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserServiceService} from "../../Services/user/user-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm!:FormGroup;
  userId='';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private route:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.userService.userDeatails(this.userId).subscribe((user) => {
        this.userUpdateForm.patchValue(user);
      });
    });
  }

  onSubmit(): void {
    if (this.userUpdateForm.valid) {
      const updatedUser = this.userUpdateForm.value;
      this.userService.editUser(this.userId, updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully.', response);
          this.router.navigate(['/users',this.userId])

        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
}
