import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventByParticipantComponent} from './event-by-participant.component';

describe('EventByParticipantComponent', () => {
  let component: EventByParticipantComponent;
  let fixture: ComponentFixture<EventByParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventByParticipantComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventByParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
