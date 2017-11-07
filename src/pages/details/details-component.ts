import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { getFormattedDateObject, getLocalISODateString } from '../shared/helpers';

// providers

import { BeverageService } from '../shared/beverage-entry/providers/beverage-service';

@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'details-component.html'
})

export class DetailsComponent {
    costPerBeverage: number;
    costForTheDay = 0;
    costForTheMonth = 0;
    costForTheYear = 0;

    // month
    month = getLocalISODateString();

    constructor(public navCtrl: NavController, private beverageService: BeverageService) {}

    ionViewDidLoad() {
        this.beverageService.getCostPerBeverage().subscribe(costPerBeverage => {
            this.costPerBeverage = costPerBeverage['cost_per_beverage'];
        });
    }

    getCostForTheday(myDate: string): void {
        this.beverageService.getDayCount(getFormattedDateObject(myDate, 'full')).subscribe(res => {
            if (res.length !== 0) {
                this.costForTheDay = res[0]['count_for_day'] * this.costPerBeverage;
            } else {
                this.costForTheDay = 0;
            }
        });
    }

    getCostForTheMonth(myDate: string): void {
        this.beverageService.getMonthCount(getFormattedDateObject(myDate, 'month_year'))
        .subscribe(res => {
            if (res.length !== 0) {
                this.costForTheMonth = res[0]['count_for_month'] * this.costPerBeverage;
            } else {
                this.costForTheMonth = 0;
            }
        });
    }

    getCostForTheYear(myDate: string): void {
        this.beverageService.getYearCount(getFormattedDateObject(myDate, 'year'))
        .subscribe(res => {
            if (res.length !== 0) {
                this.costForTheYear = res[0]['count_for_year'] * this.costPerBeverage;
            } else {
                this.costForTheYear = 0;
            }
        });
    }
}
