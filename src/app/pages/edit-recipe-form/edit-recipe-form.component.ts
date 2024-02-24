import {Component, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {GENERIC_ERROR, Recipe, STATUS} from "../../utils/constants";
import {RecipeService} from "../../services/recipe-service.service";
import {SnackbarService} from "../../services/snackbar-service.service";
import {SpinnerService} from "../../utils/spinner/spinner.service";

@Component({
    selector: 'app-edit-recipe-form',
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatFormField,
        MatIconModule,
        MatInput,
        MatLabel,
        MatRadioButton,
        MatRadioGroup,
        MatToolbar,
        MatToolbarRow,
        ReactiveFormsModule
    ],
    templateUrl: './edit-recipe-form.component.html',
    styleUrl: './edit-recipe-form.component.css'
})

export class EditRecipeFormComponent {
    recipeItem: any = {
        title: null,
        description: null,
        foodType: null,
        imageUrl: null
    }

    public constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe,
                       public recipeService: RecipeService,
                       public snackbarService: SnackbarService,
                       public spinnerService: SpinnerService,
                       private matDialogRef: MatDialogRef<EditRecipeFormComponent>,) {

        this.recipeItem.title = data.title
        this.recipeItem.description = data.description
        this.recipeItem.foodType = data.vegetarian
        this.recipeItem.imageUrl = data.image
    }


    onSubmit(): void {
        this.spinnerService.open()
        this.matDialogRef.close()

        this.data.title = this.recipeItem.title
        this.data.description = this.recipeItem.description
        this.data.vegetarian = this.recipeItem.foodType
        this.data.image = this.recipeItem.imageUrl

        this.recipeService.updateRecipe(this.data, this.data.id).subscribe({
            next: value => {
                this.spinnerService.close()
                this.snackbarService.open(STATUS.SUCCESS.toUpperCase(), STATUS.SUCCESS)
            }, error: err => {
                let error = {...GENERIC_ERROR, ...err}
                this.spinnerService.close()
                this.snackbarService.open(error.message, STATUS.ERROR)
            }
        })
    }
}
