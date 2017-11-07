import { UserService } from '../../users/providers/user.service';
import { BeverageService } from './providers/beverage-service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { BeverageEntry } from "./beverage-entry.model";

// providers

import * as _ from 'underscore';

@Component({
    selector: 'coffee-make-entry',
    templateUrl: './beverage-entry.component.html',
    styleUrls: ['/pages/shared/beverage-entry/beverage-entry.component.scss']
})

export class BeverageEntryComponent {
    beverageEntry: BeverageEntry;

    constructor(private beverageService: BeverageService, private userService: UserService, private toastCtrl: ToastController) {
        this.beverageEntry = new BeverageEntry({});
        console.log(this.beverageEntry);
    }

    getFormGroup(): FormGroup {
        return this.beverageEntry.getFormGroup();
    }

    submit(): void {
        if (this.beverageEntry.isValid()) {
            this.beverageService.makeEntry(_.extend(this.beverageEntry.getBeverageEntryDetails(),
                { 'user_id': this.userService.getLoggedInUserId() }
            )).subscribe(res => {
                console.log(res);
                const toast = this.toastCtrl.create({
                    duration: 5000,
                    position: 'bottom'
                });
                if (res) {
                    toast.setMessage('Entered successfully');
                    toast.present();
                } else {
                    toast.setMessage('Failed to entry!');
                    toast.present();
                }
            });
        }
    }
}
