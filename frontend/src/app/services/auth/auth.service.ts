import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserLogin} from "../../components/model/model.user-login";
import {Observable} from "rxjs";
import {NgToastService} from "ng-angular-popup";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host: string = "http://localhost:2026/api/v1";
  public userProfile: any | null = null;
  public userLogin: UserLogin | null = null;
  public ts: number = 0;

  constructor(private http: HttpClient, private toast: NgToastService) {
  }


  public login(email: string, password: string) {
    this.userLogin = {
      email: email,
      password: password
    }
    let options = {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    return this.http.post(this.host + "/auth/authenticate", this.userLogin, options);
  }


  public authenticateUser(idToken: any) {
    console.log(idToken['access_token']);
    localStorage.setItem("access_token", idToken['access_token']);

    let jwtHelperService = new JwtHelperService();
    let accessToken = idToken['access_token'];
    let refreshToken = idToken['refresh_token'];
    let decodedJWTAccessToken = jwtHelperService.decodeToken(accessToken);
    console.log(decodedJWTAccessToken)

  }


  public hasRole(role: string): boolean {
    if (localStorage.getItem("userProfile") == undefined) return false;
    this.userProfile = localStorage.getItem("userProfile");
    return JSON.parse(this.userProfile).role.toLowerCase() === role.toLowerCase();
  }

  public getEmailUserIsConnected(): string {
    return JSON.parse(this.userProfile).email.toLowerCase();
  }

  public isConnected(): boolean {
    return JSON.parse(localStorage.getItem("userProfile")!) != undefined;
  }

  public logout() {
    this.userProfile = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    window.location.href = "/"
  }

  public findUserAuthenticatedInDB(email: string): Observable<any> {
    return this.http.get<any>(this.host + "/auth/profile?email=" + email);
  }

  isEmailAvailable(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.host + "/auth/isEmailAvailable?email=" + email);
  }

  isUsernameAvailable(firstname: string): Observable<boolean> {
    return this.http.get<boolean>(this.host + "/auth/isUsernameAvailable?firstname=" + firstname);
  }

  registerUser(user: any): Observable<any> {
    let options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }
    return this.http.post(this.host + "/auth/register", user, options);
  }
}
