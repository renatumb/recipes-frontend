import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SnackbarService} from "../../services/snackbar-service.service";
import {GENERIC_ERROR, STATUS} from "../../utils/constants";
import {AuthService} from "../../services/auth-service.service";
import {SpinnerService} from "../../utils/spinner/spinner.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
    public isRegister: boolean = false;

    public signUpForm!: FormGroup;
    public loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private snackbarServiceService: SnackbarService,
                private spinnerService: SpinnerService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.min(8)]]
        })

        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        })
    }


    handleSignUp(): void {
        console.log("register")
        console.log(this.signUpForm.value)

       this.spinnerService.open()

       this.authService.signup(this.signUpForm.value).subscribe({
            next: resp => {
                this.spinnerService.close()
                this.snackbarServiceService.open(resp.message, STATUS.SUCCESS)
                this.signUpForm.reset()
            },
            error: err => {
                this.spinnerService.close()
                let error = {
                    ...GENERIC_ERROR,
                    ...err,
                    ...err?.error,
                }
                this.snackbarServiceService.open(error?.status + '\t-\t' + error.message, STATUS.ERROR)
            }
        })
    }

    handleLogin(): void {
        this.spinnerService.open()

        this.authService.login(this.loginForm.value).subscribe({
            next: resp => {
                this.spinnerService.close()
                this.snackbarServiceService.open(resp.message, STATUS.SUCCESS)
                localStorage.setItem('token', resp?.token)
                this.router.navigate(['/recipes']);
            },
            error: err => {
                this.spinnerService.close()

                let error = {
                    ...GENERIC_ERROR,
                    ...err,
                    ...err?.error,
                }
                this.snackbarServiceService.open(error?.status + '\t-\t' + error.message, STATUS.ERROR)
            }
        })
    }
}
