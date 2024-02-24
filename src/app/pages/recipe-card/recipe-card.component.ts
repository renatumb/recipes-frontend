import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {MatBadgeModule} from '@angular/material/badge';
import {EditRecipeFormComponent} from "../edit-recipe-form/edit-recipe-form.component";
import {GENERIC_ERROR, Recipe, STATUS} from "../../utils/constants";
import {RecipeService} from "../../services/recipe-service.service";
import {SnackbarService} from "../../services/snackbar-service.service";
import {SpinnerService} from "../../utils/spinner/spinner.service";

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
    @Output() recipeDeleted = new EventEmitter<number>();

    constructor(public editRecipeDialog: MatDialog,
                public recipeService: RecipeService,
                public snackBarService: SnackbarService,
                public spinnerService: SpinnerService) {
    }

    openEditRecipeComponent(recipe: Recipe): void {
        this.editRecipeDialog.open(EditRecipeFormComponent, { data: recipe } )
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

    removeRecipe(recipe: Recipe) {
        this.spinnerService.open()
        this.recipeService.deleteRecipe(recipe.id).subscribe({
            next: value => {
                this.spinnerService.close()
                this.recipeDeleted.emit(recipe.id)
                this.snackBarService.open(STATUS.SUCCESS.toUpperCase(), STATUS.SUCCESS)
            }, error: err => {
                this.spinnerService.close()
                let error = {
                    ...GENERIC_ERROR,
                    ...err
                }
                this.snackBarService.open(error.message, STATUS.ERROR)
            }
        })
    }
}
