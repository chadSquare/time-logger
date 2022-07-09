import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'time-logger';

  constructor(private firestore: AngularFirestore) {
  }

  firestoreDemo() {
    //  get everything in a collection
    this.firestore.collection('IMpWxOfddZMCIW07mrV7bZHnub73').valueChanges().subscribe(
      data => {
        console.log('')
        console.warn('%cGET EVERYTHING IN A COLLECTION...', 'background: #222; color: #bada55');
        console.log(data)
      }
    )

    //  get a document in a collection and listen for changes
    this.firestore.doc('IMpWxOfddZMCIW07mrV7bZHnub73/profile').valueChanges().subscribe(
      data => {
        console.log('');
        console.warn('%cGET A DOCUMENT IN A COLLECTION AND LISTEN FOR CHANGES...', 'background: #222; color: #bada55')
        console.log(data);
      }
    )

    //  get a document in a collection once
    this.firestore.doc('IMpWxOfddZMCIW07mrV7bZHnub73/profile').get().subscribe(
      data => {
        console.log('');
        console.warn('%cGET A DOCUMENT IN A COLLECTION ONCE...', 'background: #222; color: #bada55')
        console.log(data.get('firstName'));
        console.log(data.get('lastName'));
        console.log(data.get('avatar'));
      }
    )

    this.firestore.doc('IMpWxOfddZMCIW07mrV7bZHnub73/style').valueChanges().subscribe(
      data => {
        console.log('');
        console.warn('%cGET A DOCUMENT IN A COLLECTION AND LISTEN FOR CHANGES...', 'background: #222; color: #bada55')
        console.log('style', data);
      }
    )

    this.firestore.doc('IMpWxOfddZMCIW07mrV7bZHnub73/widget').valueChanges().subscribe(
      data => {
        console.log('');
        console.warn('%cGET A DOCUMENT IN A COLLECTION AND LISTEN FOR CHANGES...', 'background: #222; color: #bada55')
        console.log('widget', data)
      }
    )

    //  get a document in a collection once
    this.firestore.doc('IMpWxOfddZMCIW07mrV7bZHnub73/widget').get().subscribe(
      data => {
        console.log('');
        console.warn('%cGET A DOCUMENT IN A COLLECTION ONCE...', 'background: #222; color: #bada55')
        console.log('widget', data.get('widget1'));
        console.log('widget', data.get('widget2'));
        console.log('widget', data.get('widget3'));
      }
    )
  }
}
