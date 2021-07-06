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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";

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
    ModalModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule
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
