import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDialogContent, MatDialogActions, MatDialogClose} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";

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

    onSubmit() {
        console.log(this.recipeItem)
    }
}
