import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from "../services/services.index";

const pagesRoute: Routes = [
    {
        path: '',
        component: PagesComponent, 
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent , data: { titulo: 'Progress' }},
            { path: 'graficas1', component: Graficas1Component , data: { titulo: 'Graficas' }},
            { path: 'promesas', component: PromesasComponent , data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent , data: { titulo: 'Rxjs' }},
            { path: 'account-settings', component: AccountSettingComponent , data: { titulo: 'Ajustes del Tema' }},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

//se usa el forChild por que son rutas hijas
export const PAGES_ROUTES = RouterModule.forChild(pagesRoute)