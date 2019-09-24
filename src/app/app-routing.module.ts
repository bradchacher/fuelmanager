import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

import { DebtorsListComponent } from './components/debtors-list/debtors-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'clients/debtors', component: DebtorsListComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [RegisterGuard] },
  {path: 'client/add', component: AddClientComponent, canActivate: [AuthGuard] },
  {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard] },
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
