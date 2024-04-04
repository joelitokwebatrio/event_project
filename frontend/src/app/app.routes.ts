import {Routes} from '@angular/router';
import {EventsComponent} from "./components/events/events.component";
import {HomeComponent} from "./components/home/home.component";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegistrationComponent} from "./components/auth/participants/registration/registration.component";
import {ParticipantsComponent} from "./components/auth/participants/participants.component";
import {authOrganizerGuard} from "./guards/auth-organizer.guard";
import {EventDetailComponent} from "./components/events/event-detail/event-detail.component";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {EditEventComponent} from "./components/events/edit-event/edit-event.component";
import {
  ParticipantDetailComponent
} from "./components/auth/participants/participant-detail/participant-detail.component";
import {ParticipantEditComponent} from "./components/auth/participants/participant-edit/participant-edit.component";
import {
  EventInscriptionPersonComponent
} from "./components/events/event-inscription-person/event-inscription-person.component";
import {ProfileComponent} from "./components/auth/participants/profile/profile.component";
import {EventByParticipantComponent} from "./components/events/event-by-participant/event-by-participant.component";
import {ContactComponent} from "./components/auth/contact/contact.component";

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},

    {path: 'events', component: EventsComponent},
    {path: 'event-detail/:id', component: EventDetailComponent},
    {path: 'event-edit/:id', component: EditEventComponent},
    {path: 'event-by-participant/:id', component: EventByParticipantComponent},
    {path: 'participants', component: ParticipantsComponent, canActivate: [authOrganizerGuard]},
    {path: 'registration', component: RegistrationComponent},
    {path: 'participant-detail/:id', component: ParticipantDetailComponent},
    {path: 'participant-edit/:id', component: ParticipantEditComponent},
    {path: 'login', component: LoginComponent},
    {path: 'inscription', component: InscriptionComponent, canActivate: [authOrganizerGuard]},
    {path: 'person-inscrire/:id', component: EventInscriptionPersonComponent},
    {path: 'person-profile', component: ProfileComponent},
    {path: 'not-found', component: NotfoundComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', component: NotfoundComponent}

  ]
;
