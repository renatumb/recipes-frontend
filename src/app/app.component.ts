import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./pages/navbar/navbar.component";
import {FooterComponent} from "./pages/footer/footer.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {SpinnerComponent} from "./utils/spinner/spinner.component";
import {SpinnerService} from "./utils/spinner/spinner.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatIcon,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AuthComponent,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

    @ViewChild(SpinnerComponent, {static: false})
    targetSpinner !: ElementRef<SpinnerComponent>;

    title = 'frontend-recipe';

    constructor(private spinnerService: SpinnerService) {
    }

    ngAfterViewInit(): void {
        this.spinnerService.setSpinner(this.targetSpinner)
    }
}
