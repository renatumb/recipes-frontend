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
import {GENERIC_ERROR, STATUS} from "../../utils/constants";
import {SnackbarService} from "../../services/snackbar-service.service";

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

    constructor(public newRecipeDialog: MatDialog,
                public recipeService: RecipeService,
                public spinnerService: SpinnerService,
                public snackBarService: SnackbarService) {
    }

    openNewRecipeDialog(): void {
        this.newRecipeDialog.open(CreateRecipeFormComponent)
    }

    ngOnInit(): void {
        this.spinnerService.open()
        this.recipeService.findAllRecipes().subscribe({
            next: resp => {
                this.spinnerService.close()
                this.recipes = resp.content
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

}
