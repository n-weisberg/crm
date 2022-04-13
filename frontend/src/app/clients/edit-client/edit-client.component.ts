import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Client, ClientsService, Estimate } from '../clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {

  showEstimate = false;

  blankEstimate: Estimate = {}

  clientFormGroup: FormGroup = new FormGroup({
    name: new FormControl(this.data.client.Name),
    phone: new FormControl(this.data.client.Phone),
    address: new FormControl(this.data.client.Address),
    created: new FormControl(this.data.client.Created),
    recent: new FormControl(this.data.client.Recent),
    status: new FormControl(this.data.client.Status),
    id: new FormControl(this.data.client.Id),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {client: Client},
    private clientService: ClientsService,
    public dialog: MatDialog
    ) {}

  modify(){
    var client: Client = {
      Name: this.clientFormGroup.value.name,
      Phone: this.clientFormGroup.value.phone,
      Address: this.clientFormGroup.value.address,
    }
    if (this.data.client.Id) {
      client.Id = this.data.client.Id;
      this.clientService.editClient(client).pipe(take(1)).subscribe();;
    } else {
      // didn't work
    }
    return true;
  }

  scheduleEstimate() {
    this.showEstimate = true;

  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDeleteClientDialog)

    dialogRef.afterClosed().subscribe(result => {
      if (result == true && this.data.client.Id) {
        this.clientService.deleteClient(this.data.client.Id).pipe(take(1)).subscribe();
      }
    });
  }

}

@Component({
  selector: 'confirm-delete-client-dialog',
  templateUrl: 'confirm-delete-client-dialog.html',
})
export class ConfirmDeleteClientDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteClientDialog>) {}
  
  confirm() {
    this.dialogRef.close(true);
  }
}
