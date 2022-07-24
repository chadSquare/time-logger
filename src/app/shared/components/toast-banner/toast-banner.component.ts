import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
}

@Component({
  selector: 'app-toast-banner',
  templateUrl: './toast-banner.component.html',
  styleUrls: ['./toast-banner.component.scss']
})
export class ToastBannerComponent implements OnInit {

  header: string;
  description: string;

  constructor(public dialogRef: MatDialogRef<ToastBannerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.header = this.data['header'];
    this.description = this.data['description'];
  }

}
