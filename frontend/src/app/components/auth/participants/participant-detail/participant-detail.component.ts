import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ParticipantsService} from "../../../../services/participants/participants.service";
import {CommonModule} from "@angular/common";
import {EventsService} from "../../../../services/events/events.service";

@Component({
  selector: 'app-participant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant-detail.component.html',
  styleUrl: './participant-detail.component.css'
})
export class ParticipantDetailComponent implements OnInit {
  public idParticipantDetail: any;
  public imageUrl: any;
  public participantDetail: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private partcipantService: ParticipantsService,
              private eventService: EventsService) {
  }

  detailParticipant() {
    console.log(this.route.snapshot.params['id']);
    this.idParticipantDetail = atob(this.route.snapshot.params['id']);
    this.partcipantService.getParticipantById(this.idParticipantDetail).subscribe({
      next: data => {
        console.log(data)
        this.participantDetail = data;
      },
      error: err => {
        console.log(err.errorMessage);
      }
    })
  }


  ngOnInit(): void {
    this.detailParticipant();
    this.getImage();
  }


  getImage() {
    this.imageUrl = this.eventService.getImageURL();
  }

  back() {
    this.router.navigateByUrl("/participants");
  }
}
