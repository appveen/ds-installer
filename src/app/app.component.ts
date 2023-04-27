import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formData: any;
  configData: any;
  yamlsData: any;
  originalYamlsData: any;
  showGenerated: boolean;
  constructor(private httpClient: HttpClient) {
    this.configData = {};
    this.showGenerated = false;
  }

  ngOnInit(): void {
    this.httpClient.get('assets/data/data.json').subscribe({
      next: (data) => {
        this.formData = data;
      },
      error: (err) => {

      }
    });
    this.httpClient.get('assets/data/yamls.json').subscribe({
      next: (data) => {
        this.yamlsData = data;
        this.originalYamlsData = data;
      },
      error: (err) => {

      }
    });
  }

  generateFiles() {
    this.yamlsData = JSON.parse(JSON.stringify(this.originalYamlsData));
    let content = JSON.stringify(this.yamlsData);
    Object.keys(this.configData).forEach(key => {
      let regex = new RegExp(`__${key}__`, 'g');
      content = content.replaceAll(regex, this.configData[key]);
    });
    this.yamlsData = JSON.parse(content);
    this.showGenerated = true;
  }

  downloadFile(filename: string, text: any) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
