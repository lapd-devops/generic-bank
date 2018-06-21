import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Location} from '@angular/common';

import { AppComponent } from './app.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ExposeHeightDirective } from './directives/expose-height.directive';
import { AdminComponent } from './components/admin/admin.component';
import {ApiService} from "./services/api/api.service";
import {HttpClientModule} from "@angular/common/http";
import { AsyncProgressDirective } from './directives/async-progress.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProgressCardComponent } from './components/progress-card/progress-card.component';
import { AccountCreatedComponent } from './components/account-created/account-created.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { BalanceComponent } from './components/balance/balance.component';

const adminRoutes: Routes = [
  {
    path: 'home',
    component: AdminComponent,
    data: {
      title: '',
      showBack: false,
      showTime: true,
      link: '/accounts'
    }
  },
  {
    path: 'accounts',
    component: AccountsListComponent,
    data: {
      title: 'New customer accounts',
      showBack: true
    }
  }
];

const customerRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Welcome to Generic Bank’s Customer Portal',
      showBack: false,
      loginLink: '/login',
      signupLink: '/signup'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Open an account',
      showBack: true,
      link: '/thanks'
    }
  },
  {
    path: 'balance',
    component: BalanceComponent,
    data: {
      title: 'Account balance',
      showBack: true,
      backString: 'Logout'
    }
  },
  {
    path: 'thanks/:id',
    component: AccountCreatedComponent,
    data: {
      title: 'Thank you for choosing us as your bank',
      showBack: false,
      link: '/balance'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login to your account',
      showBack: true,
      link: '/balance'
    }
  }
];

const devRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Welcome to Generic Bank’s Customer Portal',
      showBack: false,
      loginLink: '/login',
      signupLink: '/signup'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Open an account',
      showBack: true,
      link: '/thanks'
    }
  },
  {
    path: 'thanks/:id',
    component: AccountCreatedComponent,
    data: {
      title: 'Thank you for choosing us as your bank',
      showBack: false,
      link: '/balance'
    }
  },
  {
    path: 'balance',
    component: BalanceComponent,
    data: {
      title: 'Account balance',
      showBack: true,
      backString: 'Logout'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login to your account',
      showBack: true,
      link: '/balance'
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      title: '',
      showBack: false,
      showTime: true,
      link: '/admin/accounts'
    }
  },
  {
    path: 'admin/accounts',
    component: AccountsListComponent,
    data: {
      title: 'New customer accounts',
      showBack: true,
      // showTime: true
    }
  }
];

const commonRoutes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

// let appRoutes: Routes = [];

// if(currentPath === 'admin') { //admin mode
//   appRoutes = adminRoutes;
// } else if(currentPath === 'customer') { //customer mode
//   appRoutes = customerRoutes;
// } else { //dev
//   appRoutes = devRoutes;
// }

// console.log(currentPath);

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ExposeHeightDirective,
    AdminComponent,
    AsyncProgressDirective,
    ProgressCardComponent,
    AccountCreatedComponent,
    AccountsListComponent,
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(devRoutes, {useHash: true})
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private location: Location, private router: Router) {
    let routes: Routes = [];

    switch (this.determineMode()) {
      case Mode.admin:
        routes = [...adminRoutes, ...commonRoutes];
        break;

      case Mode.customer:
        routes = [...customerRoutes, ...commonRoutes];
        break;

      default:
        routes = [...devRoutes, ...commonRoutes];
    }

    router.resetConfig(routes);

    console.log(routes);
  }

  determineMode(): Mode {
    let ret: Mode = Mode.dev;
    const currentPath = window.location.pathname.replace(/\//g, '');
    // const currentPath = '';

    switch (currentPath) {
      case 'admin':
        ret = Mode.admin;
        break;

      case 'customer':
        ret = Mode.customer;
        break;

      default:
        ret = Mode.dev;
    }

    console.log(currentPath);

    return ret;
  }
}

enum Mode {
  dev,
  admin,
  customer
}
