import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../../services/events/events.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../services/auth/auth.service";
import {AllConstants} from "../../../constants/all.constants";

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  idEventDetail: any;
  eventDetail: any;
  imageUrl: any;

  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  /**
   * recuperation du detail d'un evenement
   * @param event
   */

  detailEvent() {
    console.log(this.route.snapshot.params['id']);
    this.idEventDetail = atob(this.route.snapshot.params['id']);
    this.eventService.getEventById(this.idEventDetail).subscribe({
      next: data => {
        console.log(data)
        this.eventDetail = data;
      },
      error: err => {
        console.log(err.errorMessage);
      }
    })
  }


  ngOnInit(): void {
    this.detailEvent();
    this.getImage();
  }

  castDate(value: any): any {
    let hour = new Date(value).getHours();
    let minutes = new Date(value).getMinutes();
    let day = new Date(value).getDay() < 9 ? 0 + "" + new Date(value).getDay() : new Date(value).getDay();
    let mouth = new Date(value).getMonth() < 9 ? 0 + "" + new Date(value).getMonth() : new Date(value).getMonth();
    let year = new Date(value).getFullYear();
    return day + "/" + mouth + "/" + year + " a partie de " + hour + "h:" + minutes + "min";
  }

  back() {
    return this.router.navigateByUrl("/events");
  }

  // backCurrentEvent(){
  //   if (JSON.parse(localStorage.getItem("userProfile")!).role == AllConstants.PARTICIPANT) {
  //     let id = JSON.parse(localStorage.getItem("userProfile")!).id;
  //     return this.router.navigateByUrl(`/event-by-participant/${btoa(id)}`);
  //   }
  // }

  getImage() {
    this.imageUrl = this.eventService.getImageURL();
  }
}
