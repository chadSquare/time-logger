import { Component, OnInit } from '@angular/core';
import {getFromLocal} from "../shared/utils/localStorageUtils";
import {EntityConfigService} from "../shared/entity-config.service";
import {FormBuilder, Validators} from "@angular/forms";
import {EmployeeDetailsModel} from "../shared/model/employeeDetails";
import {map, tap} from "rxjs";
import {EntityConfigModel} from "../shared/model/entityConfig";
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {ToastBannerComponent} from "../shared/components/toast-banner/toast-banner.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    showSavingLoader = false;
    showEmployeeDetailsForm = false;
    showBankDetailsForm = false;
    showSalaryDetailsForm = false;
    bankDetailsGroup = this.fb.group({
      accountNumber: this.fb.control('123', [Validators.required]),
      accountType: this.fb.control('Cheque', [Validators.required]),
      bankName: this.fb.control('789', [Validators.required]),
      branchNumber: this.fb.control('1569', [Validators.required]),
    });
    employeeDetailsGroup = this.fb.group({
      dateOfBirth: this.fb.control('', [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      profilePicture: this.fb.control('', []),
      jobTitle: this.fb.control({value: '', disabled: true}),
      startDate: this.fb.control({value: '', disabled: true})
    });
    salaryDetailsGroup = this.fb.group({
      overtimeHourlyRate: this.fb.control({value: '', disabled: true}),
      standardHourlyRate: this.fb.control({value: '', disabled: true})
    })

  private orignalEntityConfig: EntityConfigModel;

  constructor(private entityConfigService: EntityConfigService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('asd');
    this.getEmployeeConfig()
  }

  openSuccessDialog(configType: string): void {
    const dialogRef = this.dialog.open(ToastBannerComponent, {
      panelClass: 'success-center-toast-banner',
      data: {header: `Successfully Updated ${configType}`, description: `Your ${configType} has been updated`},
    });
  }

  openWarningDialog(configType: string): void {
    const dialogRef = this.dialog.open(ToastBannerComponent, {
      panelClass: 'warning-center-toast-banner',
      data: {header: `Error Updating ${configType}`, description: `Please try again`},
    });
  }

  getEmployeeConfig() {
    const entityConfig = getFromLocal();
    if(entityConfig) {
      this.entityConfigService.getAllEmployeeConfig(entityConfig.uid).pipe(
        map(config => {
          return config.data();
        }),
        tap((config: EntityConfigModel) => {
          this.setFormData(config);
        })
      ).subscribe(
        (entityConfig) => {
          this.orignalEntityConfig = entityConfig;
        }
      );
    }
  }

  setFormData(config: EntityConfigModel) {
    this.employeeDetailsGroup.patchValue(config.employeeDetails);
    this.employeeDetailsGroup.get('dateOfBirth').patchValue(new Date(config.employeeDetails.dateOfBirth));
    this.bankDetailsGroup.patchValue(config.bankDetails);
    this.salaryDetailsGroup.patchValue(config.salaryData);
  }

  toggleEmployeeDetailsForm() {
    this.showEmployeeDetailsForm = !this.showEmployeeDetailsForm;
    this.showSalaryDetailsForm = false;
    this.showBankDetailsForm = false;
  }

  toggleBankDetailsForm() {
    this.showBankDetailsForm = !this.showBankDetailsForm;
    this.showSalaryDetailsForm =  false;
    this.showEmployeeDetailsForm =  false;
  }

  toggleSalaryDetailsForm() {
    this.showSalaryDetailsForm = !this.showSalaryDetailsForm;
    this.showBankDetailsForm = false;
    this.showEmployeeDetailsForm = false;
  }

  onCancelEmployeeDetailsForm(event) {
    event.preventDefault();
    this.employeeDetailsGroup.reset(this.orignalEntityConfig.employeeDetails);
    this.employeeDetailsGroup.get('dateOfBirth').patchValue(new Date(this.orignalEntityConfig.employeeDetails.dateOfBirth));
  }

  formatDateOfBirth(): EmployeeDetailsModel {
    const dateOfBirth = moment(this.employeeDetailsGroup.getRawValue().dateOfBirth).format('MM/DD/yyyy').replace(/\//g, '-');
    const employeeDetails: EmployeeDetailsModel = {...this.employeeDetailsGroup.getRawValue(), dateOfBirth};
    console.log(employeeDetails);
    return employeeDetails;
  }

  submitEmployeeDetailsForm(event) {
    event.preventDefault();
    const employeeDetails: EmployeeDetailsModel = this.formatDateOfBirth();
    const entityConfigModel = {...this.orignalEntityConfig, employeeDetails};

    const entityConfig = getFromLocal();
    if(entityConfig) {
      this.entityConfigService.setEmployeeDetails(entityConfig.uid, entityConfigModel)
        .then(() => {
          console.log('Setting Employee Details...');
          this.showSavingLoader = true;
        })
        .finally(() => {
          console.log('Done Setting Employee Details...');
          this.showSavingLoader = false;
          this.employeeDetailsGroup.markAsUntouched();
          this.openSuccessDialog('Employee Details');
        })
        .catch(() => this.openWarningDialog('Employee Details'));
    }
  }

  onCancelBankDetailsForm(event) {
    event.preventDefault();
    this.bankDetailsGroup.reset(this.orignalEntityConfig.bankDetails);
  }

  submitBankDetailsForm(event){
    event.preventDefault();
    const entityConfig = getFromLocal();
    const bankDetails = this.bankDetailsGroup.getRawValue();
    const entityConfigModel = {...this.orignalEntityConfig, bankDetails};
    if(entityConfig) {
      this.entityConfigService.setBankDetails(entityConfig.uid, entityConfigModel)
        .then(() => {
          console.log('Setting Bank Details...');
          this.showSavingLoader = true;
        })
        .finally(() => {
          console.log('Done Setting Bank Details...');
          this.showSavingLoader = false;
          this.bankDetailsGroup.markAsUntouched();
          this.openSuccessDialog('Bank Details');
        })
        .catch(() => this.openWarningDialog('Bank Details'));
    }
  }

  onCancelSalaryDetailsForm(event) {
    event.preventDefault();
    this.salaryDetailsGroup.reset(this.orignalEntityConfig.salaryData);
  }

  submitSalaryDetailsForm(event) {
    event.preventDefault();
    const salaryDetails = this.salaryDetailsGroup.getRawValue();
    const entityConfigModel = {...this.orignalEntityConfig, salaryDetails};
    const entityConfig = getFromLocal();
    if(entityConfig) {
      this.entityConfigService.setSalaryDetails(entityConfig.uid, entityConfigModel)
        .then(() => {
          console.log('Setting Salary Details...');
          this.showSavingLoader = true;
        })
        .finally(() => {
          console.log('Done Setting Salary Details...');
          this.showSavingLoader = false;
          this.salaryDetailsGroup.markAsUntouched();
          this.openSuccessDialog('Salary Details');
        })
        .catch(() => this.openWarningDialog('Salary Details'));
    }
  }

}
