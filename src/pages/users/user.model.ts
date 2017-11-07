import { FormGroup, FormControl, Validators } from '@angular/forms';

class User {
    name: string;
    email: string;
    user_name: string;
    password: any;
    user_id: string = null;

    constructor(userOptions: IUser) {
        for (const key in userOptions) {
            if (userOptions.hasOwnProperty(key)) {
                this[key] = userOptions[key];
            }
        }
    }
}

interface IUser {
    name?: string;
    email?: string;
    user_name?: string;
    password?: any;
    user_id?: string;
}

class UserLogin {
    user_name: string;
    password: string;
    formGroup: FormGroup;

    constructor(userOptions: IUserLogin) {
        for (const key in userOptions) {
            if (userOptions.hasOwnProperty(key)) {
                this[key] = userOptions[key];
            }
        }

        this.formGroup = new FormGroup({
            'user_name': new FormControl(this.user_name, [Validators.required]),
            'password': new FormControl(this.password, [Validators.required])
        });
    }

    getFormGroup(): FormGroup {
        return this.formGroup;
    }

    isValid(): boolean {
        return this.formGroup.valid;
    }

    getLoginDetails(): Object {
        return { 'user_name': this.user_name, 'password': this.password };
    }
}

interface IUserLogin {
    userName?: string;
    password?: string;
}

export { User, UserLogin }
