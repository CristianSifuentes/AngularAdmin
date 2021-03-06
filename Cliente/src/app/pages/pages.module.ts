import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";

import { PAGES_ROUTES } from "./pages.routes";


import { PipesModule } from './../pipes/pipes.module';



//temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";


import { ChartsModule } from 'ng2-charts';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
   declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent
   ],
   exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficoDonaComponent
   ],
   imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule
   ]
})
export class PagesModule {}