import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../auth/login/login.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SignupComponent} from "../auth/signup/signup.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  login() {
    let loginDialogRef = this.dialog.open(LoginComponent, {
      height: '300px',
      width: '600px',
      panelClass: 'center-modal',
    });
    loginDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  signup() {
    let signupDialogRef = this.dialog.open(SignupComponent, {
      height: '600px',
      width: '600px',
      panelClass: 'center-modal',
    });
    signupDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
