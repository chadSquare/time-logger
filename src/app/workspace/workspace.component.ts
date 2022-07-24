import { Component, OnInit } from '@angular/core';
import {TimeLoggerService} from "./service/time-logger.service";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  totalHours: string = "0:00";
  constructor(private timeLogger: TimeLoggerService) { }

  ngOnInit(): void {
  }

  logTime() {
    this.timeLogger.logTime();
    // this.timeLogger.getCurrentDate();

  }

}
