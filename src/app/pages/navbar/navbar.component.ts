import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {AuthService} from "../../services/auth-service.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatToolbar
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    constructor(public authService: AuthService){

    }
    logout(): void {
         this.authService.logout()
    }
}
