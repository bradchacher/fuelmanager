import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service'; 
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '', 
    date: '',
    nationalId: '',
    fuelLevel: '',    
    fuelBalance: 0
  }
  
  disableFuelBalanceOnAdd: boolean = this.settingsService.getSettings().disableFuelBalanceOnAdd;
  @ViewChild('clientForm', {static: false}) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }


  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(this.disableFuelBalanceOnAdd) {
      value.fuelBalance = 0;
    }

    if(!valid) {
      //show error
      this.flashMessage.show('please fill out the form', {
      cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //Add new client
      this.clientService.newClient(value);
      //Show message
      this.flashMessage.show('new client added successfully', {
        cssClass: 'alert-success', timeout: 4000
        });
      //Redirect to Dashboard
      this.router.navigate(['/']);
    }
  
  }

}
