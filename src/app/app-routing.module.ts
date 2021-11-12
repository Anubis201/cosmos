import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterComponent } from './modules/auth/register/register.component'
import { LoginComponent } from './modules/auth/login/login.component'
import { CheckAuthGuard } from './services/guards/check-auth.guard'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CheckAuthGuard],
    data: { authComponents: true }
  },
  {
    path: 'login',
    component: LoginComponent,
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
