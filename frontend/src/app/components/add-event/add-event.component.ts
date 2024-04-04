import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent  implements OnInit{
  public eventFormGroup!:FormGroup;
  constructor(private fb: FormBuilder,
              private  eventService:EventsService
              ) {
  }
  ngOnInit() {
  //   this.productFormGroup=this.fb.group({
  //     name : this.fb.control("", [Validators.required, Validators.minLength(4)]),
  //     price : this.fb.control(0),
  //     checked : this.fb.control(false)
  //   });
  // }
}}
