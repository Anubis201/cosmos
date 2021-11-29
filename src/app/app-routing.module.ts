import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './modules/auth/auth.component'
import { CheckAuthGuard } from './services/guards/check-auth.guard'

const routes: Routes = [
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [CheckAuthGuard],
    data: { authComponents: true }
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [CheckAuthGuard],
    data: { authComponents: true }
  },
  {
    path: 'dashboard',
    canActivate: [CheckAuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'account',
    canActivate: [CheckAuthGuard],
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
