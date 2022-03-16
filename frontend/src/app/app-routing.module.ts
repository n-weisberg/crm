import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
