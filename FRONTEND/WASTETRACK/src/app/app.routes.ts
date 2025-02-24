import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { UsersComponent } from './components/users/users.component';
import { UserDashboardComponent } from './components/users/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { CollectorsComponent } from './components/collectors/collectors.component';
import { CollectorDashboardComponent } from './components/collectors/collector-dashboard/collector-dashboard.component';
import { CollectorRequestsComponent } from './components/collectors/collector-requests/collector-requests.component';
import { CollectorHistoryComponent } from './components/collectors/collector-history/collector-history.component';
import { CollectorProfileComponent } from './components/collectors/collector-profile/collector-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminRequestsComponent } from './components/admin/admin-requests/admin-requests.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { UserHistoryComponent } from './components/users/user-history/user-history.component';



export const routes: Routes = [
    {path: '',component: LandingComponent},
    {path: 'login', component: LoginRegisterComponent},

    {path: 'users', component: UsersComponent,
        children: [
            {path: 'user-dashboard', component: UserDashboardComponent},
            {path: 'user-profile', component: UserProfileComponent},
            {path: 'user-history', component: UserHistoryComponent}
        ]
    },

    {path: 'collectors', component: CollectorsComponent,
        children: [
            {path: 'collector-dashboard', component: CollectorDashboardComponent},
            {path: 'collector-requests', component: CollectorRequestsComponent},
            {path: 'collector-history', component: CollectorHistoryComponent},
            {path: 'collector-profile', component: CollectorProfileComponent}
        ]
    },

    {path: 'admin', component: AdminComponent,
        children: [
            {path: 'admin-dashboard', component: AdminDashboardComponent},
            {path: 'admin-requests', component: AdminRequestsComponent},
            {path: 'admin-users', component: AdminUsersComponent},
            {path: 'admin-profile', component: AdminProfileComponent}
        ]
    }
];
