import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = "http://localhost:8082"

    constructor(private httpClient: HttpClient,
                private router: Router) {

    }

    public login(userData: { email: string, password: string }): Observable<any> {
        return this.httpClient.post(
            this.baseUrl + '/auth/login',
            userData
        )
    }

    public signup(userData: { firstName: string, lastName: string, email: string, password: string }): Observable<any> {
        return this.httpClient.post(
            this.baseUrl + '/auth/signup',
            userData
        )
    }

    public logout(): void {
        localStorage.clear();
        this.router.navigate(['/'])
    }

    public validateToken(): Observable<any> {
        let token = localStorage.getItem('token')

        let httpHeaders: HttpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + token)

        return this.httpClient.request(
            'GET',
            this.baseUrl + '/auth',
            { headers : httpHeaders }
        )
    }

    public isAuthenticated(): boolean{
        let token = localStorage.getItem('token')
        return token? true : false;
    }
}
