import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

function header_info() {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  }
  return options;
}

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  public host: string = "http://localhost:2026/api/v1/inscription";

  constructor(private http: HttpClient) {
  }

  public newInscription(idEvent: number, idParticipant: number): Observable<any> {

    return this.http.post<Observable<any>>(this.host + `/events/${idEvent}/${idParticipant}`, {}, header_info());
  }

  public cancelInscription(idEvent: number, idParticipant: number): Observable<any> {
    return this.http.post<Observable<any>>(this.host + `/event/cancelParticipant/${idEvent}/${idParticipant}`, {}, header_info());
  }

  public getAllParticipantInscrisToEvent(idEvent: any): Observable<any> {
    console.log(idEvent);
    return this.http.get<Observable<any>>(this.host + `/event/${idEvent}`, header_info());
  }
}
