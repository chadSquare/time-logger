import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getFromLocal} from "../../shared/utils/localStorageUtils";
import {map, Observable, Subscription, tap} from "rxjs";
import {WorkLogModel} from "../logged-time/model/work-log-model";

@Injectable({
  providedIn: 'root'
})
export class TimeLoggerService implements OnDestroy{
  private docSubscription: Subscription | undefined;

  constructor(private firestore: AngularFirestore) { }

  ngOnDestroy(): void {
    this.docSubscription?.unsubscribe();
  }

  createPath(): string {
    return `workLog/${getFromLocal()?.uid}`;
  }

  logTime() {
    let payload = {};
    this.docSubscription = this.firestore.doc(this.createPath()).get().pipe(
      tap(doc => {
        const currentDate = this.getCurrentDate();
        const currentTime = this.getCurrentTime();
        if (doc.get(currentDate)) {
          if (doc.get(currentDate)['start'] && !doc.get(currentDate)['end']) {
            // just add the end time
            payload = {[currentDate]: {end: currentTime}}
          }
          if (doc.get(currentDate)['start'] && doc.get(currentDate)['end']) {
            // update end time (overtime)
            payload = {[currentDate]: {end: currentTime}}
          }
        } else {
          payload = {[currentDate]: {start: currentTime}}
        }
      })
    ).subscribe(
      () => {
        this.firestore.doc(this.createPath()).set( payload , { merge: true })
          .finally(() => console.log('done'));
      }
    )
  }

  getLoggedTime(): Observable<any> {
    return this.firestore.doc<WorkLogModel[]>(this.createPath()).get().pipe(
      map(logs => Object.entries(logs.data()).map(entry => {
        return {[entry[0]]: entry[1]};
      })),
    )
  }

  getCurrentTime(): string {
    return new Date().toTimeString().split(' ')[0];
  }

  getCurrentDate() {
    return new Date().toLocaleDateString().replace(/\//g, '-');
  }

  // hack() {
  //   const payload = {
  //     '11-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '12-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '13-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '14-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '15-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '04-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '05-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '06-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '07-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //     '08-07-2022': {
  //       start: '08:00:00',
  //       end: '16:00:00'
  //     },
  //   }
  //   this.firestore.doc(this.createPath()).set(payload , { merge: true }).finally(() => console.log('done'))
  // }

}
