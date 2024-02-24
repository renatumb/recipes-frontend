import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";

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

    onSubmit(): void {
        alert(new Date())
    }
}
