import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "../services/auth-service.service";

export const guardAccessGuard: CanActivateFn = (route, state) => {

    let authService = inject(AuthService);
    let router = inject(Router)

    if (!authService.isAuthenticated()) {
        router.navigate(['/'])
    }
    return authService.isAuthenticated()
};
