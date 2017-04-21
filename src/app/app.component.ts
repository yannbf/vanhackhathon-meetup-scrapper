import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire } from 'angularfire2';

import { CacheService } from "ionic-cache/ionic-cache";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public af: AngularFire,
              public cache: CacheService) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.getInitialPageToLoad().then((page) => {
        this.rootPage = page;
        this.statusBar.styleDefault();
        // Defaults request cache to 1Hour
        this.cache.setDefaultTTL(60 * 60);
      });
    });
  }

  getInitialPageToLoad() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.af.auth.subscribe(user => {
        if (user) {
          resolve('TabsPage');
          unsubscribe.unsubscribe();
        } else {
          resolve('LoginPage');
          unsubscribe.unsubscribe();
        }
      });
    });
  }
}
