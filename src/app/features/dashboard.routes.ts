import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TarificationsComponent } from './tarifications/tarifications.component';
import { SessionsComponent } from './sessions/sessions.component';
import { StationsComponent } from './stations/stations.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'tarifications', component: TarificationsComponent },
      { path: 'sessions', component: SessionsComponent },
      { path: 'stations', component: StationsComponent },
      { path: 'reports', component: ReportsComponent },
    //   {
    //     path: 'factures',
    //     children: [
    //       { path: '', component: InvoiceIndexComponent },
    //       { path: 'creer/produit', component: InvoiceCreateProductComponent },
    //       { path: 'creer/service', component: InvoiceCreateServiceComponent },
    //       { path: ':id', component: InvoiceDetailComponent },
    //     ]
    //   },
    //   { path: '', redirectTo: 'app', pathMatch: 'full' }
    ],
    // canActivate: [AuthGuard]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }