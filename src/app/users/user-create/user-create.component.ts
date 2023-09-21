import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserServiceService} from "../../Services/user/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
userForm:FormGroup;

constructor(private formBuilder:FormBuilder,
            private userService:UserServiceService,
            private route:Router
) {
  this.userForm=this.formBuilder.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',Validators.required,this.asyncEmailValidator]
  })
}

   asyncEmailValidator(control: AbstractControl): Promise<{ [key: string]: any } | null> {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation (e.g., checking email availability on a server)
    setTimeout(() => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailPattern.test(control.value);

      if (valid) {
        resolve(null); // Email is valid, resolve with null (no error)
      } else {
        resolve({ invalidEmail: true }); // Email is invalid, resolve with an error object
      }
    }, 1000); // Simulate a 1-second delay
  });
}

onSubmit() :void {
      if (this.userForm.valid) {
        const formData = this.userForm.value;
        this.userService.createUser(formData).subscribe((user) => {
            console.log(user)
            this.route.navigate(['/'])
          }
        )
      }
    }
}
