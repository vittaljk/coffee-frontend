import { Component } from '@angular/core';
import { UserService } from './providers/user.service';

@Component({
    selector: 'users',
    templateUrl: './users.component.html'
})

export class UsersComponent {
    users: any[];

    constructor(private userService: UserService) { }

    ionViewDidLoad() {
        console.log("users page loaded");
        this.userService.getAllUsers().subscribe(res => {
            console.log("result", res);
            if (res) {
                this.users = res;
            }
        });
    }
}
