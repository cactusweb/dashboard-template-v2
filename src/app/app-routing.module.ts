import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { title: ' - Login' } },

    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: ' - Dashboard'} },

    { path: 'bind', loadChildren: () => import('./bind/bind.module').then(m => m.BindModule), data: { title: ' - Bind key'} },
    { path: '', pathMatch: 'full', redirectTo: '/bind' },

    { path: 'purchase', loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule), data: { title: ' - Purchase'} },

    { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule), data: { title: ' - Not Found'} }
    // { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }