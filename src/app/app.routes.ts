import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { ProfileComponent } from './features/components/profile/profile.component';
import { TimelineComponent } from './features/components/timeline/timeline.component';
import { NotificationComponent } from './features/components/notification/notification.component';
import { ChangePasswordComponent } from './features/components/change-password/change-password.component';
import { ForgetPasswordComponent } from './features/components/forget-password/forget-password.component';
import { NotFoundComponent } from './features/components/not-found/not-found.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { userLoggedGuard } from './core/auth/guards/user-logged-guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'',component:AuthLayoutComponent,canActivate:[userLoggedGuard]
        ,children:[
        {path:'login',component:LoginComponent,title:'Login'},
        {path:'register',component:RegisterComponent,title:'Register'},
        {path:'forgetPassword',component:ForgetPasswordComponent,title:'forget Password'}
    ]},
    {path:'',component:MainLayoutComponent, canActivate:[authGuard],
        children:[
        {path:'profile',component:ProfileComponent,title:'My Profile'},
        {path:'timeline',component:TimelineComponent,title:'Time Line'},
        {path:'notifications',component:NotificationComponent,title:'Notification'},
        {path:'changePassworrd',component:ChangePasswordComponent,title:'change password'}
    ]},
    {path:'notfound',component:NotFoundComponent,title:'Not Found'},
    {path:'**',redirectTo:'notfound',pathMatch:'full'}
];
