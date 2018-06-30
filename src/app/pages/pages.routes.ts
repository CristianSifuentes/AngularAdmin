import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from "./promesas/promesas.component";

const pagesRoute: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'promesas', component: PromesasComponent },
            { path: 'account-settings', component: AccountSettingComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

//se usa el forChild por que son rutas hijas
export const PAGES_ROUTES = RouterModule.forChild(pagesRoute)