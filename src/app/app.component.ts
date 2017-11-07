import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

// pages
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { UsersComponent } from '../pages/users/users.component';
import { DetailsComponent } from '../pages/details/details-component';
import { ProfileComponent} from '../pages/profile/profile.component';

// ionic native related
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

// moment
import * as Moment from 'moment';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage = HelloIonicPage;
    pages: Array<{ title: string, component: any }>;

    constructor(
        public platform: Platform,
        public menu: MenuController,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public localNotifications: LocalNotifications
    ) {
        this.initializeApp();

        // set our app's pages
        this.pages = [
            { title: 'Welcome', component: HelloIonicPage },
            { title: 'Make entry', component: ProfileComponent},
            { title: 'Details', component: DetailsComponent },
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            // Schedule notification to make entry
            this.scheduleNotification();
        });
    }

    scheduleNotification(): void {
        this.localNotifications.schedule({
            id: 1,
            text: 'Make entry',
            sound: 'file://sound.mp3',
            every: 'day',
            at: Moment("6:00:00 PM", "HH:mm:SS A").toDate()
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }
}
