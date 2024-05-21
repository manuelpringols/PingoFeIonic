import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddPingComponent } from './map/map/componenti-map/add-ping/add-ping.component';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ModalPingComponent } from './map/modal-ping/modal-ping.component';
import { LoginGoogleComponent } from './login/login/login-google/login-google.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaPingComponent } from './map/map-components/lista-ping/lista-ping.component';


@NgModule({
  declarations: [AppComponent,LoginComponent,MapComponent,AddPingComponent,ModalPingComponent,LoginGoogleComponent,ListaPingComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,GoogleMapsModule,HttpClientModule,ReactiveFormsModule],
  providers: [GooglePlus,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
