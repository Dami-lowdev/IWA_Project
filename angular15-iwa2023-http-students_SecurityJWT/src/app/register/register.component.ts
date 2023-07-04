import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {SignupInfo} from '../auth/signup-info';
import { StudentService } from '../students/student.service';
import { UserService } from '../services/user.service';
import {Student} from "../students/student.model";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo?: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private studentService: StudentService,
              private userService: UserService ) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.username,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;

        const student = {
          firstname: this.form.studentFirstName,
          lastname: this.form.studentLastName,
          email: this.form.studentEmail,
          telephone: this.form.studentTelephone
        };

        this.studentService.addStudenttodatabase(student).subscribe(
          () => {
            console.log('Student added successfully');
          },
          error => {
            console.log('Error adding student:', error);
          }
        );



      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
