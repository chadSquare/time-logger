import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  EntityConfigLS,
  getFromLocal,
  LOCAL_STORAGE_KEY,
  removeFromLocal,
  writeToLocal
} from "./utils/localStorageUtils";
import {EntityConfigService} from "./entity-config.service";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = this.auth.authState;

  constructor(private auth: AngularFireAuth, private entityConfigService: EntityConfigService, private router: Router) {}

  login(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        this.auth.authState.subscribe(
          data => {
            const obj = {email: data?.email, uid: data?.uid};
            writeToLocal(LOCAL_STORAGE_KEY, obj);
          }
        )
      })
      .finally(() => {
        this.router.navigateByUrl('myworkspace');
      })
      .catch(err => console.log(err))
  }

  signup(email: string, password: string, firstName: string, lastName: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        console.log(userData);
        const obj = {email: userData.user?.email, uid: userData.user?.uid};
        writeToLocal(LOCAL_STORAGE_KEY, obj);
      }).finally(() => {
        const entityConfig: EntityConfigLS | null = getFromLocal();
        if(entityConfig) {
          this.entityConfigService.createNewDocumentForUser(entityConfig.uid, firstName, lastName);
        }

    })
      .catch(err => console.log(err))
  }

  logout() {
    removeFromLocal(LOCAL_STORAGE_KEY);
    this.auth.signOut().then(() => {
      console.log('logged out');
    })
    .finally(() => this.router.navigateByUrl("/"))
  }

  isLoggedIn(): Observable<any> {
    return this.authState.pipe();
  }





}
