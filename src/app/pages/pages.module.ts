import { NgModule } from "@angular/core";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
   declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
   ],
   exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
   ]
})
export class PagesModule {}