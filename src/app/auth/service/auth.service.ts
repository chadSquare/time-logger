import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  EntityConfigLS,
  getFromLocal,
  LOCAL_STORAGE_KEY,
  removeFromLocal,
  writeToLocal
} from "../../shared/utils/localStorageUtils";
import {EntityConfigService} from "../../shared/entity-config.service";
import {Router} from "@angular/router";
import {map, Observable, share, shareReplay, Subscription, tap} from "rxjs";
import firebase from "firebase/compat";
import User = firebase.User;
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {isAdmin} from "../util/auth-utils";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  private isAdmin = false;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private entityConfigService: EntityConfigService, private router: Router) {
    this.listenForLoggedInUpdates();
  }

  login(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // this.auth.authState.subscribe(
        //   data => {
        //     console.log('authState', data);
        //     const obj = {email: data?.email, uid: data?.uid};
        //     writeToLocal(LOCAL_STORAGE_KEY, obj);
        //     this.isLoggedIn = true;
        //   }
        // )
      })
      .finally(() => {})
      .catch(err => console.log(err))
  }

  setLocalStorage(userData: any) {
        console.log('authState', userData);
        const obj = {email: userData?.email, uid: userData?.uid};
        writeToLocal(LOCAL_STORAGE_KEY, obj);
        this.isLoggedIn = true;
  }

  signup(email: string, password: string, firstName: string, lastName: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        // this.listenForLoggedInUpdates();
        // console.log(userData);
        // const obj = {email: userData.user?.email, uid: userData.user?.uid};
        // writeToLocal(LOCAL_STORAGE_KEY, obj);
        // this.isLoggedIn = true;
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
    .finally(() => this.router.navigateByUrl("/home"))
  }

  listenForLoggedInUpdates() {
    this.auth.authState.pipe(
      tap(userData => {
        if(userData) {
          console.log(userData);
          this.setLocalStorage(userData);
          this.getUserRoles(userData.uid);
          this.isLoggedIn = true;
          console.log('is user logged in: ', this.isLoggedIn);
        } else {
          console.log(userData);
          this.isLoggedIn = false;
          console.log('is user logged in: ', this.isLoggedIn);
        }
      })
    ).subscribe();
  }

  getLoggedIn() {
    return this.auth.authState.pipe();
  }

  getUserRoles(uid: string) {
    this.firestore.doc(`userRoles/${uid}`).get().pipe(
      map(userRoles => {
        this.isAdmin = isAdmin(userRoles.get('roles'))
      }),
    ).subscribe()
  }

  updateRoles(uid: string, roles?: string[]) {
    this.firestore.doc(`userRoles/${uid}`).set(['USER']).finally(() => console.log('updated'))
  }
}
