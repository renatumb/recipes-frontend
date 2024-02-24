import {ElementRef, Host, Injectable, ViewChild, ViewChildren,} from '@angular/core';
import {SpinnerComponent} from "./spinner.component";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private targetSpinner !: any;

    public open(): void {
        this.targetSpinner.hide = false;
    }

    public close(): void {
        setTimeout((): void => {
            this.targetSpinner.hide = true;
        }, 1000)
    }

    setSpinner(targetSpinner: ElementRef<SpinnerComponent>): void {
        this.targetSpinner = targetSpinner
    }
}
