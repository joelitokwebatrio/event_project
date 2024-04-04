import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EventsService} from "../../../services/events/events.service";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgToastModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
  public eventForm!: FormGroup;
  idEvent: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventeService: EventsService,
    private toastService: NgToastService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.idEvent = atob(this.activatedRoute.snapshot.params['id']);
    this.eventeService.getEventById(this.idEvent).subscribe({
      next: (value: any) => {
        this.eventForm = this.fb.group({
          title: this.fb.control(value.title),
          description: this.fb.control(value.description),
          startEventDate: this.fb.control(value.startEventDate),
          endEventDate: this.fb.control(value.endEventDate),
          place: this.fb.control(value.place),
          numberOfParticipants: this.fb.control(value.numberOfParticipants),
          organiserName: this.fb.control(JSON.parse(localStorage.getItem("userProfile")!).firstname),
          status: this.fb.control(value.status),
          id: this.fb.control(value.id)


        });
      },
      error: err => {
        console.log(err.errorMessage);
      }
    })

  }


  updateEvent() {
    let event = this.eventForm.value;
    console.log(event);
    this.eventeService.updateEvent(event).subscribe({
      next: value => {
        this.toastService.success({
          detail: "New Event Updated ", summary: " Event", duration: 5000
        })
      },
      error: err => {
        this.toastService.error({
          detail: "Error Event Updated ", summary: " Event", duration: 5000
        })
      }
    })

  }

  back() {
    this.router.navigateByUrl("events");
  }
}
