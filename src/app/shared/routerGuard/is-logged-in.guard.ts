import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {filter, map, Observable, of, tap} from 'rxjs';
import {getFromLocal} from "../utils/localStorageUtils";
import {AuthService} from "../../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.authService.isLoggedIn) {
    //   console.log(this.authService.isLoggedIn);
    //   return true;
    // }
    // console.log(this.authService.isLoggedIn);
    // this.router.navigateByUrl('/home')
    // return false
    const isLoggedIn = false;
    return this.authService.getLoggedIn().pipe(
      map(userData => {
        if (userData) {
          console.log(userData);
          return true;
        }
        console.log(userData);
        this.router.navigateByUrl('/home')
        return false;
      })
    )
  }
}
