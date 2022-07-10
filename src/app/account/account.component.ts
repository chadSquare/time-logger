import { Component, OnInit } from '@angular/core';
import {getFromLocal} from "../shared/utils/localStorageUtils";
import {EntityConfigService} from "../shared/entity-config.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private entityConfigService: EntityConfigService) { }

  ngOnInit(): void {
  }

  getEmployeeDetails() {
    const entityConfig = getFromLocal();
    if(entityConfig) {
      this.entityConfigService.getEmployeeDetails(entityConfig.uid).subscribe(
        (x) => console.log(x)
      );
    }
  }

}
