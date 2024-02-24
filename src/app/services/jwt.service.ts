import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    private jwtHelper: JwtHelperService;

    constructor() {
        this.jwtHelper = new JwtHelperService();
    }

    private decodeToken(token: string): any {
        return this.jwtHelper.decodeToken(token);
    }

    public getClaim(token: string, claimKey: string): any {
        const decodedToken = this.decodeToken(token);
        return decodedToken ? decodedToken[claimKey] : null;
    }
}
