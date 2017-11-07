import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getLocalISODateString } from '../helpers';
import * as moment from 'moment';

class BeverageEntry {
    entryDate = getLocalISODateString();
    coffeeCount = 0;
    teaCount = 0;
    milkCount = 0;
    badamMilkCount = 0;
    formGroup: FormGroup;

    constructor(beverageEntryOptions: IBeverageEntry) {
        for (const key in beverageEntryOptions) {
            if (beverageEntryOptions.hasOwnProperty(key)) {
                this[key] = beverageEntryOptions[key];
            }
        }

        this.formGroup = new FormGroup({
            'entryDate': new FormControl(this.entryDate, [Validators.required]),
            'coffeeCount': new FormControl(this.coffeeCount),
            'teaCount': new FormControl(this.teaCount),
            'milkCount': new FormControl(this.milkCount),
            'badamMilkCount': new FormControl(this.badamMilkCount),
        });
    }

    getFormGroup(): FormGroup {
        return this.formGroup;
    }

    isValid(): boolean {
        return this.formGroup.valid;
    }

    getBeverageEntryDetails(): Object {
        const entryDate = this.getFormattedDateString();
        return {
            day: entryDate[0],
            month: entryDate[1],
            year: entryDate[2],
            coffee_count: this.coffeeCount,
            tea_count: this.teaCount,
            milk_count: this.milkCount,
            badam_milk_count: this.badamMilkCount,
        };
    }

    getFormattedDateString(): string[] {
        return moment(this.entryDate).format('DD-MM-YY').split('-');
    }

    getFormattedDateObject(): Object {
        const dateToFormat = this.getFormattedDateString();
        return { day: dateToFormat[0], month: dateToFormat[1], year: dateToFormat[2] };
    }
}

interface IBeverageEntry {
    entryDate?: Date;
    coffeeCount?: number;
    teaCount?: number;
    milkCount?: number;
    badamMilkCount?: number;
}

export { BeverageEntry }
