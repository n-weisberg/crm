import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Timestamp } from 'rxjs';

export interface Estimate {
	Date:   string;
	Time:   string;
	Type:   string;
	Notes:  string[];
	Amount: number;
}

export interface Client {
  Id?: number;
  Name?: string;
  Phone?: string;
  Address?: string;
  Recent?: Date;
  Created?: Date;
  Status?: string;
}

export enum Status {
  Lead = "Lead",
  Estimate = "Estimate",
  Booked = "Booked",
  Archived = "Archived",
  Rejected = "Rejected",
  Complete = "Complete"
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  
  http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
  }

  getClients(): Observable<Client[]> {
    var url = "http://localhost:3000/getClients";
    return this.http.get<Client[]>(url, {observe: 'body', responseType: 'json'});
  }

  addClient(client: Client): Observable<any> {
    var url = "http://localhost:3000/addClient";
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('content-type', 'application/json');
    return this.http.post(url, client);
  }

  editClient(client: Client): Observable<any> {
    var url = "http://localhost:3000/editClient";
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('content-type', 'application/json');
    return this.http.post(url, client);
  }

  deleteClient(id: number): Observable<any> {
    var url = "http://localhost:3000/deleteClient";
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('content-type', 'application/json');
    return this.http.post(url, id);
  }

}
