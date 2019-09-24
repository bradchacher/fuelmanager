import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})

export class ClientDetailsComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationalId: '',
    fuelLevel: '',
    date: '',
    fuelBalance: 0
  };
  id: string;
  hasFuelBalance: boolean = false;
  showFuelBalanceUpdateInput: boolean = false; 

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    //get ID from url
    this.id = this.route.snapshot.params['id'];
    //get Client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null ) { 
        if(client.fuelBalance > 0 ) {
          this.hasFuelBalance = true; 
        }
      }
      this.client = client;
    });
  }

  updateFuelBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated successfully', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    if(confirm('are you sure?')) {
      this.clientService.deleteClient(this.client); 
      this.flashMessage.show('Client removed successfully', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
