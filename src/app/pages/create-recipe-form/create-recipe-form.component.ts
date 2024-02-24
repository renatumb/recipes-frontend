import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {SpinnerService} from "../../utils/spinner/spinner.service";
import {RecipeService} from "../../services/recipe-service.service";
import {SnackbarService} from "../../services/snackbar-service.service";
import {GENERIC_ERROR, Recipe, STATUS, User} from "../../utils/constants";

@Component({
    selector: 'app-create-recipe-form',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatIconModule,
        MatRadioModule,
        MatDialogClose,
        MatToolbarRow,
        MatToolbar,
    ],
    templateUrl: './create-recipe-form.component.html',
    styleUrl: './create-recipe-form.component.css'
})
export class CreateRecipeFormComponent {
    recipeItem: any = {
        title: null,
        description: null,
        foodType: null,
        imageUrl: null
    }
    newRecipe: any = {}

    public constructor(
        public spinnerService: SpinnerService,
        public snackbarService: SnackbarService,
        public recipeService: RecipeService,
        private matDialogRef: MatDialogRef<CreateRecipeFormComponent>) {

    }

    onSubmit() {
        console.log(this.recipeItem)
        this.matDialogRef.close()
        this.spinnerService.open()

        this.newRecipe.title = this.recipeItem.title
        this.newRecipe.description = this.recipeItem.description
        this.newRecipe.vegetarian = this.recipeItem.foodType
        this.newRecipe.image = this.recipeItem.imageUrl

        this.recipeService.createRecipe(this.newRecipe).subscribe({
            next: resp => {
                this.spinnerService.close()
                this.snackbarService.open(STATUS.SUCCESS.toUpperCase(), STATUS.SUCCESS)
            }, error: err => {
                this.spinnerService.close()
                let error = {...GENERIC_ERROR, ...err}
                this.snackbarService.open(error.message, STATUS.ERROR)
            }
        })
    }
}
