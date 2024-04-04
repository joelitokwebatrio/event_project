import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ParticipantsService} from "../../services/participants/participants.service";
import {EventsService} from "../../services/events/events.service";
import {map} from "rxjs";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {InscriptionService} from "../../services/inscription/inscription.service";

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgToastModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
  inscriptionGroup!: FormGroup;
  events: any[] = [];
  participants: any[] = [];

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantsService,
    private eventService: EventsService,
    private toastService: NgToastService,
    private inscriptionService: InscriptionService) {
  }


  inscriptionSubmit() {
    let participantId = this.inscriptionGroup.value.idParticipant;
    let eventId = this.inscriptionGroup.value.idEvent;
    console.log("participant ID" + participantId + " eventId" + eventId);
    this.inscriptionService.newInscription(eventId, participantId).subscribe({
      next: value => {
        console.log(value);
        this.toastService.success({
          detail: "Vous avez inscris",
          summary: "Inscription Reussite",
          duration: 5000
        })
      },
      error: err => {
        console.log(err.message);
        this.toastService.error({
          detail: "Erreur",
          summary: "cette Personne est deja inscrit",
          duration: 5000
        })
      }
    })
  }


  inscriptionCancel() {
    let participantId = this.inscriptionGroup.value.idParticipant;
    let eventId = this.inscriptionGroup.value.idEvent;
    console.log("participant " + participantId + " eventID" + eventId);
    if (confirm("Souhaitez-vous Annuler l'inscription a cette Evenement"))
      this.inscriptionService.cancelInscription(eventId, participantId).subscribe({
        next: value => {
          console.log(value);
          this.toastService.success({
            detail: "Vous avez desinscription",
            summary: "Cancel",
            duration: 5000
          })
        },
        error: err => {
          console.log(err.message);
          this.toastService.error({
            detail: "Erreur",
            summary: "ce participant n'est pas inscription a cette evenement",
            duration: 5000
          })
        }
      })
  }


  ngOnInit(): void {
    this.getAllParticipants();
    this.getEvents();
    this.inscriptionGroup = new FormGroup({
      idParticipant: new FormControl('idParticipant'),
      idEvent: new FormControl('idEvent')
    })
  }


  public getAllParticipants(): void {
    this.participantService.getAllParticipants().pipe(
      map(parts => {
        for (const element of parts) {
          this.participants.push(element);
        }
      })
    ).subscribe({
      next: value => {
      },
      error: err => {
        console.log(err.errorMessage);
        this.toastService.error({
          detail: "Error To Participant",
          summary: err.errorMessage,
          duration: 5000
        })
      }
    });
  }

  public getEvents(): void {
    this.eventService.getEvents("").pipe(
      map(evts => {
        for (const element of evts) {
          this.events.push(element);
        }

      })
    ).subscribe({
      next: value => {
      },
      error: err => {
        console.log(err.errorMessage);
        this.toastService.error({
          detail: "Error To get event Title",
          summary: err.errorMessage,
          duration: 5000
        })
      }
    });
  }
}
