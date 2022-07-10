import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WorkspaceComponent} from "./workspace/workspace.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  { path: '',   redirectTo: '/homeComponent', pathMatch: 'full' },
  {path: "homeComponent", component: HomeComponent},
  {path: "myworkspace", component: WorkspaceComponent},
  {path: "account", component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
