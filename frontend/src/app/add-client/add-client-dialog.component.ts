import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { take } from 'rxjs';
import { ClientsService, Client } from '../clients/clients.service';


@Component({
    selector: 'add-client-dialog',
    templateUrl: 'add-client-dialog.component.html',
    styleUrls: ['./add-client-dialog.component.scss']
  })
  export class AddClientDialog {
    clientFormGroup: FormGroup = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
    });
    propertyFormGroup: FormGroup = new FormGroup({
      address: new FormControl(),
    });
    detailsFormGroup: FormGroup = new FormGroup({});

    constructor(
      private clientService: ClientsService
      ) {}

    add(){
      var client: Client = {
        Name: this.clientFormGroup.value.name,
        Phone: this.clientFormGroup.value.phone,
        Address: this.propertyFormGroup.value.address,
      }
      this.clientService.addClient(client).pipe(take(1)).subscribe();;
      return true;
    }
  }

  