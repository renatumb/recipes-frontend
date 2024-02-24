import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
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

    public validateToken(requestedUrl: string): void {
        console.log( "### AuthService.validateToken")
        let token = localStorage.getItem('token')

        let storedRequetedUrl = localStorage.getItem('requestedUrl')
        if (storedRequetedUrl === requestedUrl) {
            return
        }

        this.httpClient.request(
            'GET',
            this.baseUrl + '/auth'
        ).subscribe({
            next: resp => {
                localStorage.setItem('requestedUrl', requestedUrl)
                this.router.navigate([requestedUrl])
            },
            error: err => {
                console.error( "### AuthService.validateToken")
                console.error(err)
                localStorage.clear()
            }

        })
    }

    public isAuthenticated(requestedUrl: string): boolean {
        console.log( "### AuthService.isAuthenticated")
        let token = localStorage.getItem('token')
        let storedRequetedUrl = localStorage.getItem('requestedUrl')

        this.validateToken(requestedUrl)

        if (!token || !storedRequetedUrl || !requestedUrl) {
            return false;
        }

        if (storedRequetedUrl === requestedUrl) {
            return true;
        }
        return false;
    }
}
