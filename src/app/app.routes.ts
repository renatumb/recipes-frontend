import {Routes} from '@angular/router';
import {AuthComponent} from "./pages/auth/auth.component";
import {HomeComponent} from "./pages/home/home.component";
import {guardAccessGuard} from "./utils/guard-access.guard";

export const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'recipes', component: HomeComponent, pathMatch: 'full', canActivate: [guardAccessGuard],  },
    {path: '**', redirectTo: ''}
];
