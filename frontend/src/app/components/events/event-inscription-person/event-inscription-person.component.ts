import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsService} from "../../../services/events/events.service";
import {InscriptionService} from "../../../services/inscription/inscription.service";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-event-inscription-person',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, NgToastModule],
  templateUrl: './event-inscription-person.component.html',
  styleUrl: './event-inscription-person.component.css'
})
export class EventInscriptionPersonComponent implements OnInit {

  p: number = 1;
  participants: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventsService,
    private inscriptionService: InscriptionService,
    private toastService: NgToastService) {
  }

  ngOnInit(): void {
    this.getAllParticipantInscris();
  }

  /**
   * recuperation de la liste des participants inscrire a un evenement
   */
  getAllParticipantInscris() {
    let idEvent = atob(this.route.snapshot.params['id']);
    this.inscriptionService.getAllParticipantInscrisToEvent(idEvent)
      .subscribe({
        next: (value: any) => {
          this.participants = value;
        },
        error: err => {
          console.log(err.errorMessage);
        }
      })


  }

  backInEvent() {
    this.router.navigateByUrl("events");
  }
}
