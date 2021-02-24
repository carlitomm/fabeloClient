import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DossierComponent } from './components/dossier/dossier.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthgurdGuard } from './authgurd.guard';
import { HomeComponent } from './components/home/home.component';
import { PojectDetailsComponent } from './components/poject-details/poject-details.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProjectDetailsComponent } from './components/add-project-details/add-project-details.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ImagesService } from './services/images/images.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CookieService } from 'ngx-cookie-service'
import { FileUploadModule } from 'ng2-file-upload'
import { ModalModule } from './_modal';


const appRoutes: Routes = [
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
  declarations: [
    AppComponent,
    DossierComponent,
    LoginFormComponent,
    DashboardComponent,
    HomeComponent,
    PojectDetailsComponent,
    AddProjectDetailsComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ModalModule,
    FileUploadModule
  ],
  providers: [ 
    AuthgurdGuard, 
    ImagesService, 
    NgxImageCompressService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
