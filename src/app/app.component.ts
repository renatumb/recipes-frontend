import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./pages/navbar/navbar.component";
import {FooterComponent} from "./pages/footer/footer.component";
import {HomeComponent} from "./pages/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIcon,
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-recipe';
}
