import {Component, Input, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {UserService} from "../../services/user.service";
import {JwtService} from "../../services/jwt.service";
import {AuthService} from "../../services/auth-service.service";
import {Recipe, User} from "../../utils/constants";
import {MatDialogClose} from "@angular/material/dialog";

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

    @Input('loggedUser')
    loggedUser: User = {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }

    constructor(public authService: AuthService,
                ) {
    }
    logout(): void {
         this.authService.logout()
    }
}
