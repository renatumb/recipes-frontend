import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';

export const authHeaderInterceptor: HttpInterceptorFn = (request, next) => {
    console.log('### authHeaderInterceptor')
    const token = localStorage.getItem("token")

    let requestCloned: HttpRequest<any> = request

    if (token) {
        requestCloned = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
        })
    }
    return next(requestCloned);
};
