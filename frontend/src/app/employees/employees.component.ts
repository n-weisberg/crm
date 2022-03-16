import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, EmployeeService } from './employee.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Phone', 'Address', 'Recent', 'Created'];
  allClients: MatTableDataSource<Employee>;
  employeeService: EmployeeService;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    employeeService: EmployeeService
  ) {
    this.employeeService = employeeService;
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(r => {
      this.allClients = new MatTableDataSource(r);
      this.allClients.paginator = this.paginator;
    this.allClients.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allClients.filter = filterValue.trim().toLowerCase();

    if (this.allClients.paginator) {
      this.allClients.paginator.firstPage();
    }
  }

}