import { Component, OnInit, ChangeDetectorRef,Input  } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from '@angular/cdk/platform';
import { CountappsService } from '../services/countapps.service';
import { StateinService } from '../services/statein.service';

@Component({
  selector: 'app-chartgauge',
  templateUrl: './chartgauge.component.html',
  styleUrls: ['./chartgauge.component.css'],
  providers:[Platform,MediaMatcher]
})
export class ChartgaugeComponent implements OnInit {
  @Input() objectGauge: string;

  mobileQuery: MediaQueryList;
  traffic:boolean = true;
  private _mobileQueryListener: () => void;
  view: any[] = [390, 300];
  data: any[] =[{"name":" ", "value":0}];
  month: string[];
  branch: string[];
  year:string;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dataService:CountappsService
  ,public trafficService:StateinService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  colorScheme = {
    domain: ['#003665', '#003665', '#003665']
  };
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    if(this.mobileQuery.matches)
    {
      this.view = [290,290];
    }else{
      this.view = [295, 295];
    }

    this.getDefaultParam();
    this.getDataReport();

    this.trafficService.paramChange
      .subscribe(()=>{
          this.trafficService.currentYearParam.subscribe(res=>
          {
            this.getDataReport();
          },
          error=>{console.log(error)},
          ()=>{
            console.log(this.year);
          }).unsubscribe();

          // this.trafficService.currentMonthParam.subscribe(res=>
          // {
          //   this.getDataReport();
          // },
          // error=>{console.log(error)},
          // ()=>{
          //   console.log(this.month);
          // }).unsubscribe();

          // this.trafficService.currentBranchParam.subscribe(res=>
          // { 
          //   this.getDataReport();
          // },
          // error=>{console.log(error)},
          // ()=>{
          //   console.log(this.branch);
          // }).unsubscribe();
        }
        

    );
  }

  getDefaultParam()
  {
    this.trafficService.currentYearParam.subscribe(res=> {this.year = res;});
    this.trafficService.currentBranchParam.subscribe(res=> {this.branch = res;});
    this.trafficService.currentMonthParam.subscribe(res=> {this.month = res;});
  }

  getDataReport()
  {
    this.data = [];
    let result:any[] = [{"name":" ", "value":0}];
    this.traffic = true;
    let ourAppsCode;
    let objData;
    switch (this.objectGauge) 
    { 
      case'ACQ': 
        ourAppsCode = '01'
        break; 
      case'MUF Survey': 
        ourAppsCode = '02'
        break; 
      case'MUFON': 
        ourAppsCode = '04'
        break; 
    }
    this.trafficService.setStackTraffic(this.objectGauge);
    
    this.dataService.getDataReport(this.month,[this.year],this.branch,[ourAppsCode])
    .subscribe(res=> 
      {
        objData = res;
        
        if(objData.result.group_by_source_app.length>0){
          result.pop();
          result = [{
            "name":objData.result.group_by_source_app[0].name,
            "value":parseFloat((objData.result.group_by_source_app[0].value / objData.result.total * 100).toFixed(2))
          }];
          this.trafficService.removeStackTraffic(this.objectGauge);
        }
        this.traffic = false;
        this.data = result;
      });
  }
  
  onReload()
  {
    this.data = [];
    this.getDataReport();
  }

  onResize(event) {
    if(this.mobileQuery.matches)
    {
      this.view = [310,300];
    }else{
      this.view = [400, 300];
    }
  }
}

