import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { ChartgaugeComponent } from './chartgauge/chartgauge.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FlexLayoutModule } from "@angular/flex-layout";
import {CountappsService} from './services/countapps.service';
import {StateinService} from './services/statein.service';
import {ExcelService} from './services/excelservice.service';
import {ParambranchService} from './services/parambranch.service';
import { HttpClientModule } from '@angular/common/http';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ChartlineComponent } from './chartline/chartline.component';
import { ChartmonthlyComponent } from './chartmonthly/chartmonthly.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ChartgaugeComponent,
    SidemenuComponent,
    ChartlineComponent,
    ChartmonthlyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    NgxChartsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [CountappsService, StateinService, ParambranchService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
