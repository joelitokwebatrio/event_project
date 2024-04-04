import {Component, OnInit} from '@angular/core';
import {ParticipantsService} from "../../../services/participants/participants.service";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {Router} from "@angular/router";
import {NgToastModule, NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, NgToastModule],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css'
})
export class ParticipantsComponent implements OnInit {
  participants: any;
  p: number = 1;

  constructor(private participantService: ParticipantsService,
              private router: Router,
              private toastService: NgToastService) {
  }

  ngOnInit(): void {
    this.participantService.getAllParticipants().subscribe({
      next: value => {
        this.participants = value;
        console.log(this.participants)
      },

      error: err => {
        console.log(err);
      }
    })
  }

  handleDeleteParticipant(participant: any) {
    this.participantService.deleteParticipant(participant).subscribe({
      next: value => {
        this.toastService.success({
          detail: "Successful",
          summary: "Delete Participant",
          duration: 5000
        });

      },
      error: err => {
        console.log(err + "  ddddd");
        this.toastService.error({
          detail: "Error",
          summary: "Error delete with message " + err.errorMessage,
          duration: 5000
        })
      }
    })
  }

  goToAddParticipant() {
    this.router.navigateByUrl("registration");
  }

  handleUpdateParticipant(participant: any) {
    this.router.navigateByUrl(`participant-edit/${btoa(participant.id)}`);
  }

  handleViewParticipant(participant: any) {
    this.router.navigateByUrl(`participant-detail/${btoa(participant.id)}`);
  }
}
