import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  authDemo() {
    const email = 'devAcc@mail.com';
    const password = 'dev123';
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        console.log('');
        console.warn('%cSIGN-IN EVENT DATA...', 'background: #222; color: #bada55')
        console.log('userData: ', userData);
        console.log('userData uid: ', userData.user?.uid);
        console.log('userData email: ', userData.user?.email);
        console.log('userData verified: ', userData.user?.emailVerified);
        this.auth.authState.subscribe(
          data => {
            console.log('');
            console.warn('%cLOGGED-IN USER DATA...', 'background: #222; color: #bada55')
            console.log('authState: ', data)
            console.log('authState: ', data?.email)
            console.log('authState: ', data?.emailVerified)
            console.log('authState: ', data?.uid)
          }
        )
      })
      .catch(err => console.log(err))
  }

  logout() {
    this.auth.signOut().then(() => {console.log('logged out')})
  }
}
