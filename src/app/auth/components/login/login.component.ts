import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../../service/auth.service";
import {MatDialogRef} from "@angular/material/dialog";
import {EntityConfigService} from "../../../shared/entity-config.service";
import {getFromLocal} from "../../../shared/utils/localStorageUtils";
import {tap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showLoader = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<LoginComponent>, private router: Router) { }

  ngOnInit(): void {}

  login() {
    this.showLoader = true;
    const loginFormData = this.loginForm.getRawValue()
    this.authService.login(loginFormData['email'], loginFormData['password'])
      .then(() => {
        console.log("waiting..... show loader");
        this.showLoader = true;
      })
      .finally(() => {
        console.log("done... hide loader");
        this.router.navigateByUrl('myworkspace');
        this.showLoader = false;
      });
    this.dialogRef.close();
  }

  onCancel() {
    this.loginForm.reset();
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
