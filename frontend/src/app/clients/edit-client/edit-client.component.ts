import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  clientFormGroup: FormGroup = new FormGroup({
    name: new FormControl(this.data.client.Name),
    phone: new FormControl(this.data.client.Phone),
    address: new FormControl(this.data.client.Address),
    created: new FormControl(this.data.client.Created),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: {client: Client}) {}

  ngOnInit(): void {
    console.log(this.clientFormGroup);

  }

}
