import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// providers
import { UserService } from '../../../users/providers/user.service';

import * as _ from 'underscore';

@Injectable()
export class BeverageService {

    constructor(private http: Http, private userService: UserService) { }

    getCostPerBeverage() {
        return this.http.get(
            'http://192.168.1.200:8000/api/beverages/cost_per_beverage'
        )
        .map(res => res.json());
    }

    makeEntry(entry) {
        return this.http.post(
            'http://192.168.1.200:8000/api/beverages/make_entry',
            _.extend(entry, { token: this.userService.getToken() })
        )
        .map(res => res.json());
    }

    getDayCount(day) {
        return this.http.post(
            'http://192.168.1.200:8000/api/beverages/get_day_count',
            _.extend(day, { token: this.userService.getToken() })
        )
        .map(res => res.json());
    }

    getMonthCount(day) {
        return this.http.post(
            'http://192.168.1.200:8000/api/beverages/get_month_count',
            _.extend(day, { token: this.userService.getToken() })
        )
        .map(res => res.json());
    }

    getYearCount(day) {
        return this.http.post(
            'http://192.168.1.200:8000/api/beverages/get_year_count',
            _.extend(day, { token: this.userService.getToken() })
        )
        .map(res => res.json());
    }
}
