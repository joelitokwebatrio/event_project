import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgToastService} from "ng-angular-popup";

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
export class EventsService {

  public host: string = "http://localhost:2026/api/v1";

  constructor(private http: HttpClient, private toast: NgToastService) {
  }

  public addEvent(event: any): Observable<any> {
    return this.http.post<Observable<any>>(this.host + "/event/addEvent", event, header_info());
  }

  public getEvents(location: string): Observable<any[]> {
    const url = `${this.host}/event/getAllEvents?location=${location}`;
    return this.http.get<any[]>(url, header_info());
  }

  public deleteEvent(event: any) {
    return this.http.delete(`${this.host}/event/${event.id}`, header_info());
  }

  public getEventById(id: any) {
    return this.http.get(`${this.host}/event/${id}`, header_info());
  }

  updateEvent(event: any) {
    return this.http.put(`${this.host}/event/updateEvent`, event, header_info());
  }


  public getEventsByIdParticipant(idParticipant:number): Observable<any[]> {
    const url = `${this.host}/event/getAllEvents/${idParticipant}`;
    return this.http.get<any[]>(url, header_info());
  }


  public getImageURL(): any {
    return "assets/img".concat('' + this.getRandomNumberBetween(), '.jpg');
  }

  public getRandomNumberBetween(): number {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 4) + 1;
    return randomNumber;
  }


}
