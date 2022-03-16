import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddClientDialog } from './add-client/add-client-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddClientDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  title = 'frontend';
  showFiller = false;
}

