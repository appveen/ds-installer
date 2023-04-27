import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnInit {

  @Input() formData: any;
  @Input() configData: any;
  @Input() yamlsData: any;
  @Output() generate: EventEmitter<any>;
  activeTab: any;
  constructor() {
    this.generate = new EventEmitter();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.activeTab = this.menuList[0];
      this.formList.forEach((item: any) => {
        this.configData[item.key] = item.default;
      });
    }, 100);
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

  generateFiles() {
    this.generate.emit(true);
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
