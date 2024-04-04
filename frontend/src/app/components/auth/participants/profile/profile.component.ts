import {Component, OnInit} from '@angular/core';
import {ParticipantsService} from "../../../../services/participants/participants.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public profile = JSON.parse(localStorage.getItem("userProfile")!);

  constructor(public participantService: ParticipantsService) {}

  ngOnInit(): void {
    console.log(this.profile.username);
  }


}
