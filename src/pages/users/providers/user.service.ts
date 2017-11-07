import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User, UserLogin } from '../user.model';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
    token: string = null;

    constructor(private http: Http) { }

    // list all users
    getAllUsers() {
        return this.http.get('http://192.168.1.200:8000/api/users')
        .map(res => res.json());
    }

    // login service
    login(user: Object) {
        return this.http.post(
            'http://192.168.1.200:8000/api/users/login',
            user
        )
        .map(res => {
            const response = res.json();
            this.token = response['token'];
            if (this.token) {
                localStorage.setItem('currentUser', JSON.stringify(
                    {
                        user_name: user['user_name'],
                        user_id: response['user_id'],
                        token: response['token']
                    }
                ));
                return true;
            } else {
                return false;
            }
        });
    }

    // signup service
    signup(user: User) {
        return this.http.post(
            'http://192.168.1.200:8000/api/users/signup',
            user
        )
        .map(res => res.json())
        .catch(err => Observable.throw(JSON.stringify(err)));
    }

    // logout service
    logout() {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    // login status service
    isLoggedIn(): boolean {
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            return true;
        } else {
            return false;
        }
    }

    // get logged in user
    getLoggedInUser() {
        return this.http.post(
            'api/users/',
            { user_id: JSON.parse(localStorage.getItem('currentUser'))['user_id'] }
        )
        .map(res => res.json());
    }

    getLoggedInUserId(): string {
        return JSON.parse(localStorage.getItem('currentUser'))['user_id'];
    }

    getToken(): string {
        return JSON.parse(localStorage.getItem('currentUser'))['token'];
    }
}
