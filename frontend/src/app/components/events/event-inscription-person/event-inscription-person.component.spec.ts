import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventInscriptionPersonComponent} from './event-inscription-person.component';

describe('EventInscriptionPersonComponent', () => {
  let component: EventInscriptionPersonComponent;
  let fixture: ComponentFixture<EventInscriptionPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInscriptionPersonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventInscriptionPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
