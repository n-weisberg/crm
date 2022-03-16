import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { ClientsService, Client } from './clients.service';
import { EditClientComponent } from './edit-client/edit-client.component';

// export interface Client {
//   Name: string;
//   phone: number;
//   address: string;
//   recent: string;
//   created: string;
// }

// const ELEMENT_DATA: Client[] = [
//   {Name: 'James Cameron', phone: 4068508556, address: '141 5th Ave N, Saskatoon, SK', recent: 'Feb 28, 2022', created: 'Feb 28, 2022'},
//   {Name: 'Alyanna Rabanal', phone: 3068508556, address: '241 5th Ave N, Saskatoon, SK', recent: 'Feb 28, 2022', created: 'Feb 28, 2022'},
//   {Name: 'Nick Weisberg', phone: 5068508556, address: '541 5th Ave N, Saskatoon, SK', recent: 'Feb 28, 2022', created: 'Feb 28, 2022'},
//   {Name: 'Marten Scorses', phone: 2068508556, address: '941 5th Ave N, Saskatoon, SK', recent: 'Feb 28, 2022', created: 'Feb 28, 2022'},
//   {Name: 'Steven Speilburg', phone: 1068508556, address: '81 5th Ave N, Saskatoon, SK', recent: 'Feb 28, 2022', created: 'Feb 28, 2022'},
//   {Name: 'Quentin Tarentino', phone: 7068508556, address: '41 5th Ave N, Saskatoon, SK', recent: 'Feb 28, 2022', created: 'Feb 28, 2022'},
//   {Name: 'Chrstopher Nolan', phone: 8068508556, address: '541 5th Ave N, Saskatoon, SK', recent: 'Feb 28, 2022', created: 'Feb 28, 2022'}
// ];

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
    // if (!this.allClients) {
    //   return this.allClients;
    // }
    let tab = event.tab.textLabel.trim().toLowerCase();
    console.log(tab);
    if (tab == "all clients") {
      this.allClients.filter = "";
      return this.allClients;
    }
    
    this.allClients.filter = tab;
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

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}