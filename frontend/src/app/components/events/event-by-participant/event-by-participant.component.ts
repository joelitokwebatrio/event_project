import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {EventsService} from "../../../services/events/events.service";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {InscriptionService} from "../../../services/inscription/inscription.service";

@Component({
  selector: 'app-event-by-participant',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgToastModule,
    RouterModule],
  templateUrl: './event-by-participant.component.html',
  styleUrl: './event-by-participant.component.css'
})
export class EventByParticipantComponent implements OnInit {
  eventsList: any;
  imageUrl: any;
  p: number = 1;
  idParticipant: any;
  public profile = JSON.parse(localStorage.getItem("userProfile")!);

  constructor(private fb: FormBuilder,
              private eventService: EventsService,
              private route: ActivatedRoute,
              private toast: NgToastService,
              private router: Router,
              public authService: AuthService,
              public inscriptionService: InscriptionService) {

  }

  ngOnInit(): void {
    this.idParticipant = atob(this.route.snapshot.params['id']);
    console.log(this.idParticipant);
    this.getEvents(this.idParticipant);
    this.getImage();

  }

  detailEvent(event: any) {
    this.router.navigateByUrl(`event-detail/${btoa(event.id)}`);
  }

  deleteEvent(event: any) {
    if (confirm("Are you sure to delete this item"))
      this.eventService.deleteEvent(event).subscribe({
        next: value => {
          console.log("supprssion ok" + value);
          this.getEvents(this.idParticipant);

        },
        error: err => {
          console.log(err.errorMessage);

        }
      })
  }

  updateEvent(event: any) {
    this.router.navigateByUrl(`event-edit/${btoa(event.id)}`);
  }

  getParticipants(event: any) {
    this.router.navigateByUrl(`person-inscrire/${btoa(event.id)}`);
  }

  getEvents(idParticipant: any) {
    this.eventService.getEventsByIdParticipant(idParticipant).subscribe({
      next: data => {
        this.eventsList = data;
        console.log(this.eventsList);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private getImage() {
    this.imageUrl = this.eventService.getImageURL();
  }


  cancelEvent(event: any) {
    let dataUseToCancel = {
      idEvent: event.id,
      idParticipant: JSON.parse(localStorage.getItem("userProfile")!).id
    };

    this.inscriptionService.cancelInscription(dataUseToCancel.idEvent, dataUseToCancel.idParticipant).subscribe({
      next: value => {
        console.log(value)
        this.toast.warning({
          detail: "Cancel Successful", summary: " Participant", duration: 5000
        })
        /**
         * cette variable est utiliser pour recharger
         * la page apres la suppression des elements dans cette page.
         */
         this.getEvents(dataUseToCancel.idParticipant);
      },
      error: err => {
        console.log(err.errorMessage);
        this.toast.error({
          detail: "Error Inscription", summary: " Participant", duration: 5000
        })
      }
    })

  }


}
