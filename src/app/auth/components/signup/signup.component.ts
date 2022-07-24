import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntityConfigService} from "../../../shared/entity-config.service";
import {EntityConfigLS, getFromLocal} from "../../../shared/utils/localStorageUtils";
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showSavingLoader = false;
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
              public dialogRef: MatDialogRef<SignupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm.valueChanges.subscribe(
      data => {
        console.log(data);
        this.isValid(data);
      }
    )
  }

  signup() {
    this.showSavingLoader = true;
    const formData = this.getFormData();
    console.log("sign up formData: ", formData);
    this.authService.signup(formData['email'], formData['password'], formData['firstName'], formData['lastName'])
      .then(() => {
        console.log("waiting..... show loader")
      })
      .finally(() => {
        this.showSavingLoader = false;
        this.router.navigateByUrl('myworkspace');
        this.dialogRef.close();
        console.log("done..... hide loader")
      });
  }

  getFormData() {
    return this.signupForm.getRawValue();
  }

  onCancel() {
    this.signupForm.reset();
    this.dialogRef.close();
  }

  isValid(data: {firstName: '', lastName: '', password: '', confirmPassword: ''}) {
    const password: string = data['password'];
    const confirmPassword: string = data['confirmPassword'];

    if(password && confirmPassword) {
      if (confirmPassword !== password) {
        this.signupForm.get("confirmPassword")?.setErrors({'incorrect': true});
        this.signupForm.get("password")?.setErrors({'incorrect': true});
      } else {
        this.signupForm.get("confirmPassword")?.setErrors(null);
        this.signupForm.get("password")?.setErrors(null);
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
