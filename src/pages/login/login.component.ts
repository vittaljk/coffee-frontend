import { NavController, ToastController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '../users/providers/user.service';
import { UserLogin } from "../users/user.model";
import { ProfileComponent } from '../profile/profile.component';

@Component({
    selector: 'coffee-login',
    templateUrl: './login.component.html',
    styleUrls: ['/pages/login/login.component']
})

export class CoffeeLoginComponent {
    userLogin: UserLogin = new UserLogin({});

    constructor(private userService: UserService, private toastCtrl: ToastController, public navCtrl: NavController) {

    }

    ionViewDidLoad() {
        if (this.userService.isLoggedIn()) {
            this.navCtrl.setRoot(ProfileComponent);
        }
    }

    getFormGroup(): FormGroup{
        return this.userLogin.getFormGroup();
    }

    login(): void {
        if (this.userLogin.isValid()) {
            this.userService.login(this.userLogin.getLoginDetails()).subscribe((res) => {
                let toast = this.toastCtrl.create({
                    duration: 3000,
                    position: 'bottom'
                });
                if (res) {
                    toast.setMessage('logged in successfully');
                    toast.present();
                    this.navCtrl.setRoot(ProfileComponent);
                } else {
                    toast.setMessage('username or password incorrect!');
                    toast.present();
                }
            });
        }
    }
}
