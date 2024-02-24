import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {MatBadgeModule} from '@angular/material/badge';
import {EditRecipeFormComponent} from "../edit-recipe-form/edit-recipe-form.component";

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

    constructor(public editRecipeDialog: MatDialog) {
    }

    openEditRecipeComponent(): void {
        this.editRecipeDialog.open(EditRecipeFormComponent)
    }
}
