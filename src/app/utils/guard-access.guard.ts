import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {validateAndFlattenComponentImports} from "@angular/compiler-cli/src/ngtsc/annotations/component/src/util";

export const guardAccessGuard: CanActivateFn = (route, state) => {
    console.log('### guardAccessGuard');
    let authService = inject(AuthService);
    let router = inject(Router)

    const authenticated: boolean = authService.isAuthenticated(state.url)

    if (!authenticated) {
        router.navigate(['/'])
    }else{
        return true
    }
    return false
};
