import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { ClientsService, Client, Status } from './clients.service';
import { EditClientComponent } from './edit-client/edit-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  tabs: string[] = ["All Clients", "Leads", "Estimates", "Booked", "Rejected", "Archived"]
  displayedColumns: string[] = ['Name', 'Phone', 'Address', 'Recent', 'Created'];
  allClients: MatTableDataSource<Client>;
  clientService: ClientsService;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    clientService: ClientsService,
    public dialog: MatDialog
  ) {
    this.clientService = clientService;
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(r => {
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

  filterTab(event: any) {
    let tab = event.tab.textLabel.trim();
    if (tab == "All Clients") {
      this.allClients.filter = "";
      if (this.allClients.paginator) {
        this.allClients.paginator.firstPage();
      }
      return this.allClients;
    }
    if (tab == "Leads") {
      this.allClients.filter = Status.Lead;
      if (this.allClients.paginator) {
        this.allClients.paginator.firstPage();
      }
      return this.allClients;
    }
    if (tab == "Archived") {
      this.allClients.filter = Status.Archived;
      if (this.allClients.paginator) {
        this.allClients.paginator.firstPage();
      }
      return this.allClients;
    }
    if (this.allClients.paginator) {
      this.allClients.paginator.firstPage();
    }
    return this.allClients;
  }

  openEditClient(row: Client) {
    const dialogRef = this.dialog.open(EditClientComponent, {
      data: {
        client: row,
      },
    });
  }

}