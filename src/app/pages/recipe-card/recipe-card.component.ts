import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {MatBadgeModule} from '@angular/material/badge';
import {EditRecipeFormComponent} from "../edit-recipe-form/edit-recipe-form.component";
import {GENERIC_ERROR, Recipe, STATUS} from "../../utils/constants";
import {RecipeService} from "../../services/recipe-service.service";
import {SnackbarService} from "../../services/snackbar-service.service";

@Component({
    selector: 'app-recipe-card',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule
    ],
    templateUrl: './recipe-card.component.html',
    styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

    @Input({
        required: true
    })
    recipe!: Recipe

    @Input()
    enableEditDeleteButtons: boolean = false;

    constructor(public editRecipeDialog: MatDialog,
                public recipeService: RecipeService,
                public snackBarService: SnackbarService) {
    }

    openEditRecipeComponent(): void {
        this.editRecipeDialog.open(EditRecipeFormComponent)
    }

    likeDislikeRecipe(recipeID: number) {
        this.recipeService.likeRecipe(recipeID).subscribe({
            next: resp => {
                this.recipe = {
                    ...this.recipe,
                    ...resp
                }
            }, error: err => {
                let error = {
                    ...GENERIC_ERROR,
                    ...err
                }

                this.snackBarService.open(error.message, STATUS.ERROR)
            }
        })
    }
}
