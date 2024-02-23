import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar';
import {STATUS} from "../utils/constants"

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {

    private config: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1500
    }

    constructor(private _snackBar: MatSnackBar) {
    }

    public open(message: string, status: STATUS): void {
        this.config = {
            ...this.config,
            panelClass: status + '-snackbar'
        }
        this._snackBar.open(message, '', this.config)
    }
}
