import {Component, OnInit} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";

import {CreateRecipeFormComponent} from "../create-recipe-form/create-recipe-form.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {RecipeService} from "../../services/recipe-service.service";
import {SpinnerService} from "../../utils/spinner/spinner.service";
import {GENERIC_ERROR, STATUS, User} from "../../utils/constants";
import {SnackbarService} from "../../services/snackbar-service.service";
import {UserService} from "../../services/user.service";
import {JwtService} from "../../services/jwt.service";
import {AuthService} from "../../services/auth-service.service";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RecipeCardComponent,
        MatButtonModule,
        MatIconModule,
        NavbarComponent,
        FooterComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    recipes!: any[];

    currentPage: number = -1
    firstPage : number = 0;
    lastPage : number =  -1;

    loggedUser: User = {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }

    constructor(public newRecipeDialog: MatDialog,
                public recipeService: RecipeService,
                public spinnerService: SpinnerService,
                public snackBarService: SnackbarService,
                public userService: UserService,
                public jwtService: JwtService,
                public authService: AuthService) {
    }

    openNewRecipeDialog(): void {
        this.newRecipeDialog.open(CreateRecipeFormComponent)
    }

    ngOnInit(): void {
        this.loadData(0)
        this.loadUser()
    }

    public loadData(pageNumber: number){
        console.log( 'page required\t' + pageNumber)
        this.spinnerService.open()
        this.recipeService.findAllRecipes( pageNumber ).subscribe({
            next: resp => {
                this.spinnerService.close()
                this.recipes = resp.content
                this.currentPage = resp.number
                this.lastPage = resp.totalPages -1
            }, error: err => {
                let error = {
                    ...GENERIC_ERROR,
                    ...err,
                    ...err?.error,
                }
                this.spinnerService.close()
                this.snackBarService.open(error?.status + '\t-\t' + error.message, STATUS.ERROR)
            }
        })
    }

    private loadUser() {
        const email: string = this.jwtService.getClaim(this.authService.getToken(), 'sub')
        this.userService.getUserByEmail(email).subscribe({
            next: resp => {

                this.loggedUser = {
                    ...this.loggedUser,
                    ...resp
                }
            }, error: err => {
            }
        })
    }
}
