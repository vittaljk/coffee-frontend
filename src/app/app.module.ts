import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
// pages
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { UsersComponent } from '../pages/users/users.component';
import { CoffeeLoginComponent } from '../pages/login/login.component';
import { BeverageEntryComponent } from '../pages/shared/beverage-entry/beverage-entry.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { DetailsComponent } from '../pages/details/details-component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// providers
import { UserService } from '../pages/users/providers/user.service';
import { BeverageService } from '../pages/shared/beverage-entry/providers/beverage-service';
import { LocalNotifications } from '@ionic-native/local-notifications';

const components = [
    MyApp,
    HelloIonicPage,
    UsersComponent,
    CoffeeLoginComponent,
    BeverageEntryComponent,
    ProfileComponent,
    DetailsComponent
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        ...components
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        UserService,
        BeverageService,
        LocalNotifications
    ]
})
export class AppModule { }
