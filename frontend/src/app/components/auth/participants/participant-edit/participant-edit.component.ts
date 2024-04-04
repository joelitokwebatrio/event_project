import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {ParticipantsService} from "../../../../services/participants/participants.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-participant-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './participant-edit.component.html',
  styleUrl: './participant-edit.component.css'
})
export class ParticipantEditComponent implements OnInit {
  public participantForm!: FormGroup;
  idParticipant: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private participantService: ParticipantsService,
    private toastService: NgToastService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.idParticipant = atob(this.activatedRoute.snapshot.params['id']);
    this.participantService.getParticipantById(this.idParticipant).subscribe({
      next: (value: any) => {
        this.participantForm = this.fb.group({
          username: this.fb.control(value.username),
          firstname: this.fb.control(value.firstname),
          lastname: this.fb.control(value.lastname),
          email: this.fb.control(value.email),
          password: this.fb.control(value.password),
          gender: this.fb.control(value.gender),
          role: this.fb.control(value.role),
          id: this.fb.control(value.id)
        });
      },
      error: err => {
        console.log(err.errorMessage);
      }
    })
  }


  updateParticipant() {
    let participant = this.participantForm.value;
    console.log(participant);
    this.participantService.updateParticipant(participant).subscribe({
      next: value => {
        this.toastService.success({
          detail: "Participant updated ",
          summary: " Event",
          duration: 5000
        })
      },
      error: err => {
        this.toastService.error({
          detail: "Error Participant Updated ",
          summary: " Event",
          duration: 5000
        })
      }
    })

  }

  back() {
    this.router.navigateByUrl("participants");
  }
}
