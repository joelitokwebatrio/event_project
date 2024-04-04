import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root' // Or a specific module if needed
})
export class UniqueUserValidator implements AsyncValidator {
  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    let username = control.value;
    return this.authService.isUsernameAvailable(username).pipe(
      map((result) => {
        if (result) return null
        else return {usernameDuplicated: true}
      })
    );
  }

}
