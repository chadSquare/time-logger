import { Injectable } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  employeeDetails = this.fb.group({});
  bankDetails = this.fb.group({});
  salaryDetails = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  createEmployeeDetailsForm() {

    this.employeeDetails.addControl('', this.fb.control('', []));
  }
  createBankDetailsForm() {}
  createSalaryDetailsForm() {}
}
