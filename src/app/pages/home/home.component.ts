import {Component} from '@angular/core';
import {RecipeCardComponent} from "../recipe-card/recipe-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

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

    recipes = [1, 1, 1, 1, 1, ]
}
