import { UserService } from '../users/providers/user.service';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { CoffeeLoginComponent } from '../login/login.component';
import { User } from "../users/user.model";
@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {
    constructor(public navCtrl: NavController, private userService: UserService) { }

    goToLogin(): void {
        this.navCtrl.setRoot(CoffeeLoginComponent);
    }

    addUser(name, userName, email, password) {
        const user = new User({
            name: name,
            user_name: userName,
            email: email,
            password: password
        });
        this.userService.signup(user).subscribe((res) => {
            console.log('result', res);
        }, err => console.log(err));
    }
}
