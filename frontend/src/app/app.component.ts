import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth/auth.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {EventsService} from "./services/events/events.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public authService: AuthService,
              public toast: NgToastService,
              public eventService: EventsService,
              public router: Router) {

  }


  logout() {
    this.toast.warning({detail: "Warning", summary: "Your are Log out", duration: 5000});
    this.authService.logout();
  }


  myEvents() {
   let id =  JSON.parse(localStorage.getItem("userProfile")!).id;
    this.router.navigateByUrl(`event-by-participant/${btoa(id)}`);
  }



}
