import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  Name: string;
  Phone: string[];
  Address: string;
  Created: string;
  Wage: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  http: HttpClient;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
  }

  getEmployees(): Observable<Employee[]> {
    var url = "http://35.224.208.80:8080/employees";
    // var options: = {responseType: "json"};
    console.log("test");
    this.http.get<Employee[]>(url, {observe: 'body', responseType: 'json'}).subscribe(r => console.log(r));
    return this.http.get<Employee[]>(url, {observe: 'body', responseType: 'json'});
  }
}
