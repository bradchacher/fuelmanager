import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';



@Component({
  selector: 'app-debtors-list',
  templateUrl: './debtors-list.component.html',
  styleUrls: ['./debtors-list.component.css']
})
export class DebtorsListComponent implements OnInit {
  clients: Client[];
  hasFuelBalance: boolean = false;
  fuelOwed: number;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.clientService.getDebtors().subscribe(clients => {
        this.clients = clients;
        this.hasFuelBalance = true;
        this.getTotalOwed();
        console.log(this.clients);
    });
  }


  getTotalOwed() {
    this.fuelOwed = this.clients.reduce((total, client) => {
    return total + parseFloat(client.fuelBalance.toString());
  }, 0);
}  

}
