import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WorkspaceComponent} from "./workspace/workspace.component";
import {AccountComponent} from "./account/account.component";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {TimeLoggerComponent} from "./workspace/time-logger/time-logger.component";
import {LoggedTimeComponent} from "./workspace/logged-time/logged-time.component";
import {IsLoggedInGuard} from "./shared/routerGuard/is-logged-in.guard";


const routes: Routes = [
  {path: '',   redirectTo: '/myworkspace', pathMatch: 'full'},
  {path: "home", component: HomeComponent},
  {path: "myworkspace", component: WorkspaceComponent, canActivate: [AngularFireAuthGuard, IsLoggedInGuard]},
      {path: "timelogger", component: TimeLoggerComponent, canActivate: [AngularFireAuthGuard, IsLoggedInGuard]},
      {path: "loggedtime", component: LoggedTimeComponent, canActivate: [AngularFireAuthGuard, IsLoggedInGuard]},
  {path: "account", component: AccountComponent, canActivate: [AngularFireAuthGuard, IsLoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
