import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusComponent } from './status/status.component';
import { FormComponent } from './form/form.component';
import { ResponseComponent } from './response/response.component';
import { EndpointComponent } from './endpoint/endpoint.component';
import { SidebarComponent } from './sidebar/sidebar.component'



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'status/:project_id', component: StatusComponent },
  { path: 'form', component: FormComponent },  
  { path: 'response', component: ResponseComponent}, 
  { path: 'sidebar', component: SidebarComponent},
  { path: 'endpoint/:endpoint_id', component: EndpointComponent } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
