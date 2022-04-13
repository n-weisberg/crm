import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ClientsService, Estimate } from '../clients.service';

@Component({
  selector: 'app-edit-estimate',
  templateUrl: './edit-estimate.component.html',
  styleUrls: ['./edit-estimate.component.scss']
})
export class EditEstimateComponent implements OnInit {

  data: Estimate = {}

  estimateFormGroup: FormGroup = new FormGroup({
    date: new FormControl(this.data?.Date),
    type: new FormControl(this.data?.Type),
    amount: new FormControl(this.data?.Amount),
    notes: new FormControl(this.data?.Notes),
    created: new FormControl(this.data?.Created),
    recent: new FormControl(this.data?.Recent),
    status: new FormControl(this.data?.Status),
    id: new FormControl(this.data?.Id),
  });

  constructor(
    private clientService: ClientsService,
    public dialog: MatDialog
    ) {}
    
  ngOnInit(): void {
  }

  add(){
    var estimate: Estimate = {
      Date: this.estimateFormGroup.value.date,
      Type: this.estimateFormGroup.value.type,
      Amount: this.estimateFormGroup.value.amount,
      Notes: this.estimateFormGroup.value.date,
    }
    this.clientService.addEstimate(estimate).pipe(take(1)).subscribe();;
    return true;
  }

}
