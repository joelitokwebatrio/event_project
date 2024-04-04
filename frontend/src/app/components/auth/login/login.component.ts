import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../../services/auth/auth.service";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterLink, NgToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  idToken: any;
  errorMessage: any;
  private userInfo: any | null = null;

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private router: Router, private toast: NgToastService) {
  }

  ngOnInit() {

    this.loginFormGroup = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  handleLogin() {
    this.errorMessage = undefined;
    let email = this.loginFormGroup.value.email;
    let password = this.loginFormGroup.value.password;
    this.authservice.login(email, password).subscribe({
      next: response => {
        this.idToken = response;
        this.authservice.authenticateUser(this.idToken);
        this.authservice.findUserAuthenticatedInDB(email).subscribe({
          next: value => {
            this.toast.success({
              detail: "Success Message", summary: "Login is Success", duration: 5000
            })
            this.router.navigateByUrl("/home");
            console.log(value);
            console.log("store user in local storage")
            localStorage.setItem('userProfile', JSON.stringify(value));
            this.userInfo = localStorage.getItem('userProfile')
            console.log(this.userInfo);
            console.log(JSON.parse(this.userInfo).username);
          },
          error: err => {
            console.log(err.errorMessage);
            console.log("*******");
          }
        })
      }, error: err => {
        this.toast.error({
          detail: "Error Message", summary: "Login failed, Try again later ", duration: 5000
        })
        if (err.status == 0) {
          this.errorMessage = "Connection Problem";
        } else if (err.status == 401) {
          this.errorMessage = err.error.errorMessage;
        }
      }
    })
    console.log(email);
    console.log(password);
  }
}
