import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigFormComponent } from './config-form/config-form.component';
import { InstallScriptsComponent } from './install-scripts/install-scripts.component';
import { ClickToCopyDirective } from './click-to-copy.directive';

@NgModule({
  declarations: [
    AppComponent,
    ConfigFormComponent,
    InstallScriptsComponent,
    ClickToCopyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
