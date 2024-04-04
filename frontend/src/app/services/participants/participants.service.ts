import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  public host: string = "http://localhost:2026/api/v1/auth";
  constructor(private http: HttpClient) {
  }

  public getAllParticipants(): Observable<any> {
    return this.http.get<Observable<any>>(this.host + "/participants");
  }

  public addParticipant(participant: any): Observable<any> {
     return this.http.post<Observable<any>>(this.host + "/register", participant);
  }


  public deleteParticipant(participant: any) {
    console.log(participant.id);
    return this.http.delete(`${this.host}/participant/delete/${participant.id}`);
  }

  public getParticipantById(id: any) {
    return this.http.get(`${this.host}/participant/${id}`);
  }

  public updateParticipant(participant: any) {
    return this.http.patch(`${this.host}/participant/update`,participant);
  }
}
