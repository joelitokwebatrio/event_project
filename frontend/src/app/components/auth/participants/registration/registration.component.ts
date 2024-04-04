import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {UniqueEmailValidator} from "../../../validators/unique-email.validator";
import {UniqueUserValidator} from "../../../validators/unique-user.validator";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {valuesMatchValidator} from "../../../validators/passwords.match.validator";
import {WhiteSpaceValidators} from "../../../validators/not-white.space";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, NgToastModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  registrationFormGroup!: FormGroup;
  errorMessage: any;
  formStatus: number = 0;
  public roles = ["PARTICIPANT","ORGANIZER"];

  constructor(private fb: FormBuilder,
              public authService: AuthService,
              private uniqueUserValidator: UniqueUserValidator,
              private uniqueEmailValidator: UniqueEmailValidator,
              private toastService: NgToastService) {
  }

  ngOnInit() {
    this.registrationFormGroup = this.fb.group({
      username: ['', {
        asyncValidators: [this.uniqueUserValidator],
        validators: [Validators.required, WhiteSpaceValidators.notOnlyWhitespace]
      }],
      firstname: this.fb.control('', [Validators.required, WhiteSpaceValidators.notOnlyWhitespace]),
      lastname: this.fb.control('', [Validators.required, WhiteSpaceValidators.notOnlyWhitespace]),
      email: ['', {
        validators: [Validators.required, Validators.email, WhiteSpaceValidators.notOnlyWhitespace],
        asyncValidators: [this.uniqueEmailValidator]
      }],
      role: this.fb.control('PARTICIPANT'),
      password: this.fb.control('', [Validators.required, WhiteSpaceValidators.notOnlyWhitespace]),
      confirmPassword: this.fb.control('', [Validators.required, WhiteSpaceValidators.notOnlyWhitespace]),
      gender: this.fb.control('MALE')
    }, {
      validators: valuesMatchValidator('password', 'confirmPassword')
    });
  }

  get username() {
    return this.registrationFormGroup.controls['username'];
  }

  get firstname() {
    return this.registrationFormGroup.controls['firstname'];
  }

  get lastname() {
    return this.registrationFormGroup.controls['lastname'];
  }

  get email() {
    return this.registrationFormGroup.controls['email'];
  }

  get password() {
    return this.registrationFormGroup.controls['password'];
  }

  get confirmPassword() {
    return this.registrationFormGroup.controls['confirmPassword'];
  }

  registerUser() {
    this.authService.registerUser(this.registrationFormGroup.value).subscribe({
      next: value => {
        this.formStatus = 1;
        this.toastService.success({
          detail: "Added Participant",
          summary: " Event",
          duration: 5000
        })

      },
      error: err => {
        this.formStatus = 2;
        this.errorMessage = err.error.error;
        this.toastService.error({
          detail: "Error Registration",
          summary: " Event",
          duration: 5000
        })
      }
    })
  }
}
