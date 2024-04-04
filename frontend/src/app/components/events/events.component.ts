import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventsService} from "../../services/events/events.service";
import {NgxPaginationModule} from "ngx-pagination";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {AuthService} from "../../services/auth/auth.service";
import {InscriptionService} from "../../services/inscription/inscription.service";

@Component({
  selector: 'app-events',
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

  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  eventFormGroup!: FormGroup;
  errorMessage: any;
  eventsList: any;
  imageUrl: any;
  p: number = 1;
  public profile = JSON.parse(localStorage.getItem("userProfile")!);

  constructor(private fb: FormBuilder,
              private eventService: EventsService,
              private toast: NgToastService,
              private router: Router,
              public authService: AuthService,
              public inscriptionService: InscriptionService ) {

  }

  ngOnInit() {
    /**
     * MEthode pour affichier la listes des evenement present dans la base de donnees
     */
    this.getEvents();
    this.getImage();
    /**
     * initialisation du formulaire d'enregistrement d'un nouveau evenement.
     */
    this.eventFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startEventDate: new FormControl('', [Validators.required]),
      endEventDate: new FormControl('', [Validators.required]),
      place: new FormControl('',),
      numberOfParticipants: new FormControl(0, [Validators.required]),
      organiserName: new FormControl(JSON.parse(localStorage.getItem("userProfile")!).firstname),
      status: new FormControl(true)
    });

  }


  get title() {
    return this.eventFormGroup.controls['title'];
  }

  get description() {
    return this.eventFormGroup.controls['description'];
  }

  get startEventDate() {
    return this.eventFormGroup.controls['startEventDate'];
  }

  get endEventDate() {
    return this.eventFormGroup.controls['endEventDate'];
  }

  get place() {
    return this.eventFormGroup.controls['place'];
  }

  get numberOfParticipants() {
    return this.eventFormGroup.controls['numberOfParticipants'];
  }

  get organiserName() {
    return this.eventFormGroup.controls['organiserName'];
  }


  eventSubmit() {
    let formVal = this.eventFormGroup.value;
    this.eventService.addEvent(formVal).subscribe({
      next: value => {
        console.log(value);
        this.getEvents();
        this.toast.success({
          detail: "New Event Added ", summary: " Event", duration: 5000
        })
      },
      error: err => {
        console.log(err.errorMessage);
        this.toast.error({
          detail: "Error Event", summary: err.errorMessage, duration: 5000
        })
      }
    })

  }


  getEvents() {
    this.eventService.getEvents("").subscribe({
      next: data => {
        this.eventsList = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deleteEvent(event: any) {
    if (confirm("Are you sure to delete this item"))
      this.eventService.deleteEvent(event).subscribe({
        next: value => {
          console.log("supprssion ok" + value);
          this.getEvents();
        },
        error: err => {
          console.log(err.errorMessage);
        }
      })
  }

  detailEvent(event: any) {
    this.router.navigateByUrl(`event-detail/${btoa(event.id)}`);
  }

  updateEvent(event: any) {
    this.router.navigateByUrl(`event-edit/${btoa(event.id)}`);
  }

  private getImage() {
    this.imageUrl = this.eventService.getImageURL();
  }

  /**
   * recuparation de tous les participants a un evenements
   * @param event
   */
  getParticipants(event: any) {
    this.router.navigateByUrl(`person-inscrire/${btoa(event.id)}`);
  }

  registerMyToEvent(event: any) {
    let data = {
      idEvent: event.id,
      idParticipant: JSON.parse(localStorage.getItem("userProfile")!).id
    }
    console.log(data);
    this.inscriptionService.newInscription(data.idEvent, data.idParticipant).subscribe({
      next: value => {
        console.log(value)
        this.toast.success({
          detail: "New Inscription Of Participant", summary: " Participant", duration: 5000
        })
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
