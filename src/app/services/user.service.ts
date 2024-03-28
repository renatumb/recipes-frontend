import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL, User} from "../utils/constants";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl = BASE_URL

    constructor(private httpClient: HttpClient) {
    }

    public getAllUsers(page: number = 0, size: number = 5, sort: string = 'ASC'): Observable<any> {
        let paramData: HttpParams = new HttpParams()
            .set('page', page)
            .set('size', size)
            .set('sort', sort);

        return this.httpClient.get(
            this.baseUrl + '/users',
            {params: paramData}
        )
    }

    public getUserById(id: number): Observable<any> {
        return this.httpClient.get(
            this.baseUrl + '/users/' + id,
        )
    }

    public getUserByEmail(email: string): Observable<any> {
        return this.httpClient.get(
            this.baseUrl + '/users/byEmail/' + email
        )
    }

    public removeUser(id: number): Observable<any> {
        return this.httpClient.delete(
            this.baseUrl + '/users/' + id
        )
    }

    public createUser(data: User): Observable<any> {
        return this.httpClient.post(
            this.baseUrl + '/users',
            data
        )
    }
}
