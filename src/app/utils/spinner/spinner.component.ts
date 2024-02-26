import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [
        CommonModule,
        MatProgressBar,
        MatProgressSpinner
    ],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
    @Input('hide')
    public hide: boolean = true;
}
