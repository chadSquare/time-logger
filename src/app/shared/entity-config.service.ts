import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {EntityConfigModel} from "./model/entityConfig";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntityConfigService {

  constructor(private firestore: AngularFirestore) { }

  createNewDocumentForUser(uid: string, firstName: string, lastName: string) {
    console.log('running createNewDocumentForUser()');
    const config: EntityConfigModel = {
          bankDetails: {
            accountNumber: '',
            accountType: '',
            bankName: '',
            branchNumber: ''
          },
          employeeDetails: {
            dateOfBirth: '',
            firstName: firstName,
            lastName: lastName,
            profilePicture: '',
            jobTitle: '',
            startDate: ''
          },
          salaryData: {
            overtimeHourlyRate: 0,
            standardHourlyRate: 0
          }
        }
    console.log(uid);
    this.firestore.collection(`users`).doc(uid).set(config).catch(err => console.log(err))
  }

  getEmployeeDetails(uid: string){
    return this.firestore.doc<EntityConfigModel>(`users/${uid}`).get().pipe(map(data => data.get('employeeDetails')));
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
