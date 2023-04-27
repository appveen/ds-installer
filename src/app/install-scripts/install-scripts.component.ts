import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-install-scripts',
  templateUrl: './install-scripts.component.html',
  styleUrls: ['./install-scripts.component.scss']
})
export class InstallScriptsComponent implements OnInit {

  @Input() formData: any;
  @Input() configData: any;
  @Input() yamlsData: any;
  @Output() back: EventEmitter<any>;
  activeTab: any;
  selfSignedKeyCertCommand!: string;
  k8sSecretCommand!: string;
  copied: boolean;
  constructor() {
    this.back = new EventEmitter();
    this.copied = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.activeTab = this.yamlList[0];
      this.selfSignedKeyCertCommand = `openssl req -newkey rsa:2048 -nodes -keyout odp_server.key -out odp_server.csr -subj "/C=IN/ST=Karnataka/L=Bangalore/O=appveen/OU=Engineering/CN=appveen.com"\nopenssl x509 -signkey odp_server.key -in odp_server.csr -req -days 365 -out odp_server.crt`;
      this.k8sSecretCommand = `kubectl create secret generic ds-proxy-sec --from-file=odp_server.crt=./odp_default.crt --from-file=odp_server.key=./odp_default.key -n=${this.namespace}`;
    }, 100);
  }

  backClick() {
    this.back.emit(false);
  }

  downloadFiles() {

  }

  copyContent(content: string) {
    navigator.clipboard.writeText(content);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  get yamlList() {
    if (!this.formData) {
      return [];
    }
    if (!this.formData.yamls) {
      return [];
    }
    return this.formData.yamls;
  }

  get moduleList() {
    if (!this.formData) {
      return [];
    }
    if (!this.formData.modules) {
      return [];
    }
    return this.formData.modules;
  }

  get imageList() {
    if (!this.formData) {
      return [];
    }
    if (!this.formData.images) {
      return [];
    }
    return this.formData.images;
  }

  get yamlContent() {
    if (!this.activeTab) {
      return null;
    }
    return this.yamlsData[this.activeTab.key].join('\n');
  }
  get dockerRegistryURL() {
    if (!this.configData) {
      return 'appveen';
    }
    return this.configData['DOCKER_REGISTRY_SERVER']
  }

  get release() {
    if (!this.configData) {
      return '2.7.0';
    }
    return this.configData['RELEASE'];
  }

  get dockerCommands() {
    const rows: string[] = [];
    this.imageList.forEach((item: any) => {
      rows.push(`docker pull ${this.dockerRegistryURL}/data.stack.${item}:${this.release}`);
    });
    return rows.join('\n');
  }

  get k8sCommands() {
    const rows: string[] = [];
    this.yamlList.forEach((item: any) => {
      if (item.key == 'CM') {
        rows.push(`kubectl apply -f ./configMap.yaml`);
      } else if (item.key == 'SA') {
        rows.push(`kubectl apply -f ./serviceAccount.yaml`);
      } else {
        rows.push(`kubectl apply -f ./${item.key.toLowerCase()}.yaml`);
      }
    });
    return rows.join('\n');
  }

  get namespace() {
    if (!this.configData) {
      return 'appveen';
    }
    return this.configData['DATA_STACK_NAMESPACE']
  }

}
