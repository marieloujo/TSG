import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule) },
    { path: 'app', loadChildren: () => import('@features/features.module').then(m => m.FeaturesModule) },
    { path: '', redirectTo: '/app', pathMatch: 'full' }
];
