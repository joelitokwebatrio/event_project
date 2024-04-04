import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root' // Or a specific module if needed
})
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    let email = control.value;
    return this.authService.isEmailAvailable(email).pipe(
      map((result) => {
        if (result == true) return null
        else return {emailDuplicated: true}
      })
    );
  }

}
