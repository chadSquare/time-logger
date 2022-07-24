import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import { SignupComponent } from './auth/components/signup/signup.component';
import { AccountComponent } from './account/account.component';
import {ReactiveFormsModule} from "@angular/forms";
import { WorkspaceComponent } from './workspace/workspace.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import { TimeLoggerComponent } from './workspace/time-logger/time-logger.component';
import { LeaveTrackerComponent } from './workspace/leave-tracker/leave-tracker.component';
import {
  CalculateHoursPipe,
  GetDatePipe,
  GetMinsPipe,
  LoggedTimeComponent
} from './workspace/logged-time/logged-time.component';
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { ToastBannerComponent } from './shared/components/toast-banner/toast-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    AccountComponent,
    WorkspaceComponent,
    TimeLoggerComponent,
    LeaveTrackerComponent,
    LoggedTimeComponent,
    CalculateHoursPipe,
    GetDatePipe,
    GetMinsPipe,
    ToastBannerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        BrowserAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  entryComponents: [
    // SignupComponent
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
