import { Component, OnInit, Input } from '@angular/core';
import { CountappsService } from '../services/countapps.service';
import { StateinService } from '../services/statein.service';

@Component({
  selector: 'app-chartmonthly',
  templateUrl: './chartmonthly.component.html',
  styleUrls: ['./chartmonthly.component.css']
})
export class ChartmonthlyComponent implements OnInit {
  @Input() objMonth: string;
  data: any[];
  traffic:boolean = true;

  month: string[];
  branch: string[];
  year:string;

  view: any[] = [900, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Application';
  showYAxisLabel = true;
  yAxisLabel = 'Entry';

  colorScheme = {
    domain: ['#d63939', '#1bba5d', '#efb404', '#00dbd0', '#003665']
  };

  constructor(public countService:CountappsService, public trafficService:StateinService) {
    
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
            console.log("test");
            this.getDataReport();
          },
          error=>{console.log(error)},
          ()=>{ }).unsubscribe();
        }
    );
    this.data=this.initMonth(InitMonthData);
  }

  getDataReport()
  {
    this.traffic = true;
    let ourAppsCode;
    let objData;
    InitMonthData = this.initMonth(InitMonthData);
    
    this.countService.getDataReportByMonth(this.month,[this.year],this.branch,["01","02"])
    .subscribe(res=> 
      {
        objData = res;
        
        if(objData.result.group_by_month.length>0){
          objData.result.group_by_month.forEach(element => {
            let series={"name":element.APP , "value":+element.JUMLAH};
            InitMonthData.find(res=>res.name == element.MONTH).series.push(series);
          });
        }
        
        this.data = InitMonthData;
        this.traffic = false;
      });
      
  }

  getDefaultParam()
  {
    this.trafficService.currentYearParam.subscribe(res=> {this.year = res;});
    this.trafficService.currentBranchParam.subscribe(res=> {this.branch = res;});
    this.trafficService.currentMonthParam.subscribe(res=> {this.month = res;});
  }

  initMonth(InitMonthDataParam:MultiTempClass[])
  {
    InitMonthDataParam = 
    [
      {
        "name": "January",
        "series": []
      },
      {
        "name": "February",
        "series": []
      },
      {
        "name": "March",
        "series": []
      },
      {
        "name": "April",
        "series": []
      },
      {
        "name": "May",
        "series": []
      },
      {
        "name": "June",
        "series": []
      },
      {
        "name": "Jul",
        "series": []
      },
      {
        "name": "August",
        "series": []
      },
      {
        "name": "September",
        "series": []
      },
      {
        "name": "October",
        "series": []
      },
      {
        "name": "November",
        "series": []
      },
      {
        "name": "December",
        "series": []
      }
    ];
    return InitMonthDataParam;
  }

  onReload()
  {
    this.data = [];
    this.getDataReport();
  }

}

export class MultiTempClass{
  name:string="";
  series:any[];
}

export class SeriesClass{
  name:string="";
  value:number=0;
}

export var InitMonthData:MultiTempClass[];