import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  activeTab!: any;
  formData: any;
  configData: any;
  constructor(private httpClient: HttpClient) {
    this.configData = {};
  }

  ngOnInit(): void {
    this.httpClient.get('assets/data/data.json').subscribe({
      next: (data) => {
        this.formData = data;
        this.activeTab = this.menuList[0];
        this.formList.forEach((item: any) => {
          this.configData[item.key] = item.default;
        });
      },
      error: (err) => {

      }
    })
  }
  isChecked(item: any) {
    if (typeof this.configData[item.key] == 'boolean') {
      return this.configData[item.key];
    }
    if (item.default && item.default == 'true') {
      return true;
    }
  }

  onCheckedChange(event: Event, item: any) {
    this.configData[item.key] = (event.target as HTMLInputElement).checked;
  }


  get menuList() {
    if (!this.formData) {
      return [];
    }
    if (!this.formData.menu) {
      return [];
    }
    return this.formData.menu;
  }

  get formList() {
    if (!this.formData) {
      return [];
    }
    if (!this.formData.forms) {
      return [];
    }
    return this.formData.forms;
  }
}
