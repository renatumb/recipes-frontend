import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";

import {CreateRecipeFormComponent} from "../create-recipe-form/create-recipe-form.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RecipeCardComponent,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    recipes = [1, 1, 1, 1, 1,]

    constructor(public newRecipeDialog: MatDialog) {
    }

    openNewRecipeDialog(): void {
        this.newRecipeDialog.open(CreateRecipeFormComponent)
    }

}
