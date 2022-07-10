import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EntityConfigLS, getFromLocal} from "../shared/utils/localStorageUtils";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  options = ['My Workspace', 'Account', 'logout', 'other options'];
  formGroup = this.fb.group({
    optionsControl: ['', [Validators.required]]
  })

  selectedOption = "";
  public isLoggedIn = false;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.listenForLoggedInUpdates();
    this.listenForRouterChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  listenForRouterChanges() {
    this.router.events.subscribe(
      data => {
        const currentUrl = this.router.url.substring(1, this.router.url.length)
        switch (currentUrl) {
          case 'myworkspace':
            this.formGroup.get('optionsControl')?.setValue("My Workspace");
            break;
          case 'account':
            this.formGroup.get('optionsControl')?.setValue("Account");
            break;
          default:
            this.formGroup.get('optionsControl')?.setValue("");
            break;
        }
      }
    )
  }

  listenForLoggedInUpdates() {
    this.authService.isLoggedIn().pipe(
      tap(userData => {
        if(userData) {
          this.isLoggedIn = true;
          this.setupHeaderForm();
        } else {
          this.isLoggedIn = false;
        }
      })
    ).subscribe();
  }


  setupHeaderForm() {
    const entityData: EntityConfigLS | null = getFromLocal();
    if(entityData) {
      const currentUrl = this.router.url.substring(1, this.router.url.length)
      this.formGroup.get('optionsControl')?.setValue(currentUrl);
      this.selectedOption = this.formGroup.get('optionsControl')?.value;
      const page = this.formGroup.get("optionsControl");
    }
  }

  navigate() {
    const page = this.formGroup.get("optionsControl")?.value;
    if(page) {
      switch(page) {
        case "My Workspace":
          console.log(page.toLowerCase().replace(/\s/g, ""));
          this.router.navigateByUrl(`${page.toLowerCase().replace(/\s/g, "")}`);
          break;
        case "Account":
          console.log(page.toLowerCase());
          this.router.navigateByUrl(`${page.toLowerCase()}`);
          break;
        case "logout":
          this.authService.logout()
          break;
      }
    }
  }



}
