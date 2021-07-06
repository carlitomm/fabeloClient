import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthgurdGuard } from './authgurd.guard';

import { AboutComponent } from './components/about/about.component';
import { AddProjectDetailsComponent } from './components/add-project-details/add-project-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PojectDetailsComponent } from './components/poject-details/poject-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'CoMpLiCaTePath_f@3e10Hun8',
    component: LoginFormComponent
  },
  {
    path: 'dashboard', 
    canActivate: [AuthgurdGuard],
    component: DashboardComponent
  },
  {
    path: 'details/:id',
    component: PojectDetailsComponent
  },
  {
    path: 'Configure_Project',
    component: AddProjectDetailsComponent
  },
  {
    path: 'Configure_Project/:id',
    component: AddProjectDetailsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthgurdGuard]
})
export class AppRoutingModule { }
