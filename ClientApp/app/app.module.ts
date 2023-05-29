//import { Chart } from 'chart.js';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth.guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { Auth } from './services/auth.service';
import { PhotoService } from './services/photo.service';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { AppErrorHandler } from './app.error-handler';
import { VehicleService } from './services/vehicle.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
//added
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { ToastyModule } from 'ng2-toasty';
import * as Raven from 'raven-js';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import {ChartModule} from 'angular2-chartjs'


//added
Raven.config('https://119104ece598427b9a72a81cc8b2719d@sentry.io/235207')
.install();
@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        //added
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        //added
        
        ChartModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            //added
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate:[AdminAuthGuard] },

            //
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }


        ])
    ],
    //added
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler},
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress},
        BrowserXhrWithProgress,
        ProgressService,

        VehicleService,
        PhotoService,
        Auth,
        AuthGuard,
        AdminAuthGuard,
        AUTH_PROVIDERS,
        
        
    ]
})


export class AppModuleShared {
}
