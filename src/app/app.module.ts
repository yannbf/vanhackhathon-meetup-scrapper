import { LoadingService } from '../providers/util/loading.service';
import { AlertService } from '../providers/util/alert.service';
import { ToastService } from '../providers/util/toast.service';
import { AuthModule } from '../pages/auth/auth.module';
import { MeetupFirebaseData } from '../providers/meetup-firebase-data';
import { MeetupData } from '../providers/meetup-data';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation'

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { Facebook } from '@ionic-native/facebook';

import { CacheService } from "ionic-cache/ionic-cache";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyA2WUdcpBjBLXWnWql-5YCmhB0Rne3L1jc",
  authDomain: "meetupscrapper.firebaseapp.com",
  databaseURL: "https://meetupscrapper.firebaseio.com",
  projectId: "meetupscrapper",
  storageBucket: "",
  messagingSenderId: "170983945898"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

const appSettings = {
  tabsPlacement: 'bottom',
  backButtonText: '',
  backButtonIcon: 'ios-arrow-back',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  pageTransition: 'ios'
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    AuthModule,
    IonicModule.forRoot(MyApp, appSettings),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    MeetupData,
    MeetupFirebaseData,
    StatusBar,
    SplashScreen,
    ToastService,
    AlertService,
    LoadingService,
    Facebook,
    CacheService,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule {}
