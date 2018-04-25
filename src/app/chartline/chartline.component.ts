import { Component, OnInit, Input } from '@angular/core';
import { CountappsService } from '../services/countapps.service';
import { StateinService } from '../services/statein.service';

@Component({
  selector: 'app-chartline',
  templateUrl: './chartline.component.html',
  styleUrls: ['./chartline.component.css']
})
export class ChartlineComponent implements OnInit {
   @Input() objectLine: string;
    data: any[] =[{"name":" ", "value":0}];
    traffic:boolean = true;

    month: string[];
    branch: string[];
    year:string;

    view: any[] = [450, 200];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Entry';
    showYAxisLabel = true;
    yAxisLabel = 'Job Position';

    colorScheme = {
      domain: ['#d63939', '#1bba5d', '#efb404', '#00dbd0', '#003665']
    };

  constructor(public countService:CountappsService, public trafficService:StateinService) {
    //Object.assign(this, {single})
  }
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
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
            
          }).unsubscribe();
        }
    );
  }

  getDefaultParam()
  {
    this.trafficService.currentYearParam.subscribe(res=> {this.year = res;});
    this.trafficService.currentBranchParam.subscribe(res=> {this.branch = res;});
    this.trafficService.currentMonthParam.subscribe(res=> {this.month = res;});
  }

  onReload()
  {
    this.data = [];
    this.getDataReport();
  }

  getDataReport()
  {
    this.data = [];
    let result:any[] = [{"name":" ", "value":0}];
    this.traffic = true;
    let ourAppsCode;
    let objData;
    switch (this.objectLine) 
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
    this.trafficService.setStackTraffic(this.objectLine);
    
    this.countService.getDataReport(this.month,[this.year],this.branch,[ourAppsCode])
    .subscribe(res=> 
      {
        objData = res;
        
        if(objData.result.group_by_job.length>0){
          result.pop();
          objData.result.group_by_job.forEach(element => {
            if(element.name)
              if(element.name == "CRO")
                result.push(element);
              else if(element.name == "MRO" || element.name == "BRO")
              {
                if(result.find(x=>x.name == 'BRO'))
                {
                  let temp = +result.find(x=>x.name == 'BRO').value;
                  result.find(x=>x.name == 'BRO').value = temp + +element.value;
                }else
                {
                  result.push({"name":"BRO", "value":element.value});
                }
              }else
              {
                if(result.find(x=>x.name == 'DE'))
                {
                  let temp = +result.find(x=>x.name == 'DE').value;
                  result.find(x=>x.name == 'DE').value = temp + +element.value;
                }else
                {
                  result.push({"name":"DE", "value":element.value});
                }
              }
          });

          this.trafficService.removeStackTraffic(this.objectLine);
        }
        this.traffic = false;
        this.data = result;
      });
  }
}

