import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {TimeLoggerService} from "../service/time-logger.service";
import {find, flatMap, map, Observable, reduce, shareReplay, tap, toArray} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-logged-time',
  templateUrl: './logged-time.component.html',
  styleUrls: ['./logged-time.component.scss']
})
export class LoggedTimeComponent implements OnInit {
  logsObs$: Observable<any> | undefined;
  logs = [];
  previousWeekFilterCounter = 1;
  displayedWeek = [];
  listObs$: Observable<any> | undefined;
  firstDay = '';
  lastDay = '';
  totalTimeWorkedForWeek = 0;

  constructor(private timelogger: TimeLoggerService) { }

  ngOnInit(): void {
    this.getLoggedTime();
    this.filter('current');
  }

  getLoggedTime() {
    this.listObs$ = this.logsObs$ = this.timelogger.getLoggedTime();
  }

  filter(where: string) {
    let time = 0;
    switch (where) {
      case 'current':
        console.log(where);
        const thisWeek = this.getThisWeek();
        this.listObs$ = this.logsObs$.pipe(
        tap(data => console.log(data)),
          map((firestoreWorkLogs) => {
            return firestoreWorkLogs.filter(workLog => {
              const workLogKey = Object.keys(workLog)[0];
              if(thisWeek.includes(workLogKey)) {
                console.log(workLog);
                console.log(Object.values(workLog));
                return workLog;
              }
            })
          }),
          tap(data => {
            this.displayedWeek = thisWeek;
            this.firstDay = thisWeek[0];
            this.lastDay = thisWeek[6];
            time += this.calculateTimeWorkedForWeek(data);
            this.totalTimeWorkedForWeek = time;
            this.setWorkedTimeToZero(data);
            console.log(data)
          }),
          shareReplay()
        )
        break;
      case 'previous':
        console.log(where);
        const previousWeek = this.getPreviousWeek(this.firstDay);
        this.listObs$ = this.logsObs$.pipe(
          tap(data => console.log(data)),
          map((firestoreWorkLogs) => {
            return firestoreWorkLogs.filter(workLog => {
              const workLogKey = Object.keys(workLog)[0];
              const thisWeek = this.getThisWeek();
              console.log(thisWeek[0]);
              console.log(this.displayedWeek[0]);
              if(previousWeek.includes(workLogKey)) {
                console.log(workLog);
                return workLog;
              }
            })
          }),
          tap(data => {
            this.displayedWeek = previousWeek;
            this.firstDay = previousWeek[0];
            this.lastDay = previousWeek[6];
            time += this.calculateTimeWorkedForWeek(data);
            this.totalTimeWorkedForWeek = time;
            this.setWorkedTimeToZero(data);
            console.log(data)
          }),
        )
        break;
      case 'future':
        console.log(where);
        const futureWeek = this.getFutureWeek(this.lastDay);
        this.listObs$ = this.logsObs$.pipe(
          tap(data => console.log(data)),
          map((firestoreWorkLogs) => {
            return firestoreWorkLogs.filter(workLog => {
              const workLogKey = Object.keys(workLog)[0];
              const thisWeek = this.getThisWeek();
              if(futureWeek.includes(workLogKey)) {
                console.log(workLog);
                return workLog;
              }
            })
          }),
          tap(data => {
            this.displayedWeek = futureWeek;
            this.firstDay = futureWeek[0];
            this.lastDay = futureWeek[6];
            time += this.calculateTimeWorkedForWeek(data);
            this.totalTimeWorkedForWeek = time;
            this.setWorkedTimeToZero(data);
            console.log(data)
          }),
        )
        break;
    }
  }

  getThisWeek(): string[] {
    const currentDay = moment(new Date()).isoWeekday();
    const daysInWeek = [];
    for(let x = currentDay; x >= 0; x--) {
      daysInWeek.push(moment(new Date()).subtract(x, 'day').format('DD/MM/yyyy'));
    }
    for(let x = currentDay; x < 6; x++) {
      daysInWeek.push(moment(new Date()).add(x, 'day').format('DD/MM/yyyy'));
    }
    return daysInWeek.map(day => day.replace(/\//g, '-'))
  }

  getPreviousWeek(firstDayOfCurrentDisplayedWeek: string) {
    const daysPerWeek = 7;
    const splitDate = firstDayOfCurrentDisplayedWeek.split('-');
    const lastWeekDates = [];
    for(let x = daysPerWeek; x > 0; x--) {
      lastWeekDates.push(moment([splitDate[2], (+splitDate[1] - 1).toString(), splitDate[0]]).subtract(x, 'day').format('DD/MM/yyyy'));
    }
    return lastWeekDates.map(day => day.replace(/\//g, '-'))
  }

  getFutureWeek(lastDayOfCurrentDisplayedWeek: string) {
    const splitDate = lastDayOfCurrentDisplayedWeek.split('-');
    const futureWeekDates = [];
    for(let x = 1; x <= 7; x++) {
      futureWeekDates.push(moment([splitDate[2], (+splitDate[1] - 1).toString(), splitDate[0]]).add(x, 'day').format('DD/MM/yyyy'));
    }
    return futureWeekDates.map(day => day.replace(/\//g, '-'))
  }

  setWorkedTimeToZero(data: {}) {
    if(!Object.keys(data).length) {
      this.totalTimeWorkedForWeek = 0;
    }
  }

  calculateTimeWorkedForWeek(data: string[]): number{
    let time = 0;
    for (let dataKey in data) {
      time += this.calculateTimeWorkedForTimeLog(data[dataKey]);
    }
    return time;
  }

  calculateTimeWorkedForTimeLog(workLog) {
    console.log(workLog);
    if (Object.values(workLog)[0]['end']) {
      console.log(Object.values(workLog)[0]['start']);
      console.log(Object.values(workLog)[0]['end']);
      const splitStart = Object.values(workLog)[0]['start'].split(':')
      const splitEnd = Object.values(workLog)[0]['end'].split(':')
      const startMoment = moment([splitStart[0], splitStart[1], splitStart[1]], 'HH:mm:ss')
      const endMoment = moment([splitEnd[0], splitEnd[1], splitEnd[1]], 'HH:mm:ss')
      return endMoment.diff(startMoment, 'hours', true);
    } else {
      console.log(Object.values(workLog)[0]['start']);
      // console.log(Object.values(workLog)[0]['end']);
      const splitStart = Object.values(workLog)[0]['start'].split(':')
      // const splitEnd = Object.values(workLog)[0]['end'].split(':')
      const startMoment = moment([splitStart[0], splitStart[1], splitStart[1]], 'HH:mm:ss')
      const endMoment = moment(new Date().getTime());
      // const endMoment = moment([splitEnd[0], splitEnd[1], splitEnd[1]], 'HH:mm:ss')
      // console.log(endMoment.format('HH:mm:ss'));
      return endMoment.diff(startMoment, 'hours', true);
      // return 0;
    }
  }

}

@Pipe({ name: 'calculateHours' })
export class CalculateHoursPipe implements PipeTransform {
  transform(workLog: any) {
    console.log(workLog);
    if (Object.values(workLog)[0]['end']) {
      const endTimeArray = Object.values(workLog)[0]['end'].split(':');
      const startTimeArray = Object.values(workLog)[0]['start'].split(':');
      const endTime = moment([endTimeArray[0], endTimeArray[1], endTimeArray[2]], "HH:mm:ss");
      const startTime = moment([startTimeArray[0], startTimeArray[1], startTimeArray[2]], "HH:mm:ss");
      const diff = (endTime.diff(startTime, 'hours', true)).toFixed(2);
      const hours = diff.split('.')[0];
      let minutes = +diff.split('.')[1];
      minutes = (minutes / 100) * 60;
      let seconds = +minutes.toString().split('.')[1];
      seconds = (seconds / 100) * 60;
      const minutesToDisplay = minutes.toString().split('.')[0];
      const secondsToDisplay = seconds.toString().split('.')[0];
      return `${hours} hours ${minutesToDisplay} minutes`;
    } else {
      console.log(Object.values(workLog)[0]['start']);
      // console.log(Object.values(workLog)[0]['end']);
      const splitStart = Object.values(workLog)[0]['start'].split(':')
      // const splitEnd = Object.values(workLog)[0]['end'].split(':')
      const startMoment = moment([splitStart[0], splitStart[1], splitStart[1]], 'HH:mm:ss')
      const endMoment = moment(new Date().getTime());
      // const endMoment = moment([splitEnd[0], splitEnd[1], splitEnd[1]], 'HH:mm:ss')
      // console.log(endMoment.format('HH:mm:ss'));
      const decimalTime = endMoment.diff(startMoment, 'hours', true);
      const hours = decimalTime.toString().split('.')[0]
      if(!decimalTime.toString().split('.')[1]) {
        return `${hours} hours`;
      }
      const decimalMinutes = '0.' + decimalTime.toString().split('.')[1];
      const minutes = +decimalMinutes * 60;
      return `${hours} hours ${minutes.toFixed(0)} minutes`;
    }

  }
}

@Pipe({ name: 'getDate' })
export class GetDatePipe implements PipeTransform {
  transform(obj: any) {
    return Object.keys(obj)[0];
  }
}

@Pipe({ name: 'getMins' })
export class GetMinsPipe implements PipeTransform {
  transform(obj: any) {
    if(obj !== 0) {
      const splitTime = obj.toString().split('.');
      if(splitTime.length < 2) {
        return `${obj} hours`
      }
      const hours = splitTime[0];
      const mins = '0.' + splitTime[1];
      const minutes = +mins * 60;
      return `${hours} hours ${minutes.toFixed(0)} minutes`
    }
    return `${obj} hours`;
  }
}
