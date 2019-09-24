import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module'; 
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationalId: '',
    fuelLevel: '',
    date: '',
    fuelBalance: 0
  }
  disableFuelBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableFuelBalanceOnEdit = this.settingsService.getSettings().disableFuelBalanceOnEdit;
    //get ID from url
    this.id = this.route.snapshot.params['id'];
    //get Client
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if(!valid) {
      this.flashMessage.show('please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      }); 
    } else {
      //add id to client
      value.id = this.id;
      //update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated succesfuly', {
        cssClass: 'alert-success', timeout: 4000
      }); 
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
