import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';



import { Client } from '../../models/Client';
import { from } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  fuelOwed: number;

  constructor(
    private clientService: ClientService
    ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
      this.fuelOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.fuelBalance.toString());
    }, 0);
  }

}
