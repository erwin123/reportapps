import { Component, OnInit,Input  } from '@angular/core';
import { CountappsService } from '../services/countapps.service';
import { ExcelService } from '../services/excelservice.service';
import { StateinService } from '../services/statein.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  month: string[];
  branch: string[];
  year:string;
  traffic:boolean = false;

  monthInfo:string="";
  branchInfo:string="";
  yearInfo:string="";
  constructor(public countService:CountappsService, public excelService:ExcelService, public stateinService:StateinService) { }
  ngOnInit() {
    this.getDefaultParam();
    this.stateinService.paramChange
      .subscribe(()=>{
          this.stateinService.currentYearParam.subscribe(res=>
          {
            this.monthInfo = this.month.length > 1 ? "Month : Multiple Value | ": "Month : "+this.month[0] +" | ";
            this.yearInfo = this.yearInfo.length > 1 ? "Year : Multiple Value | ": "Year : "+ this.year[0] +" | ";
            this.branchInfo = this.branchInfo.length > 1 ? "BranchCode : Multiple Value | ":  "BranchCode : "+this.branch[0] +" | ";
          },
          error=>{console.log(error)},
          ()=>{
            
          }).unsubscribe();
        }
    );
  }

  getDataReport()
  {
    this.traffic = true;
    this.getDefaultParam();
    let objData;
    this.countService.getDataReportRaw(this.month,[this.year],this.branch)
    .subscribe(res=> 
      {
        objData = res;
        if(objData.result.data.length>0){
          console.log(objData);
        }
      },
    error=>{},
    ()=>{
      this.excelService.exportAsExcelFile(objData.result.data,"export_raw");
      this.traffic = false;
    });
  }

  getDefaultParam()
  {
    this.stateinService.currentYearParam.subscribe(res=> {this.year = res;});
    this.stateinService.currentBranchParam.subscribe(res=> {this.branch = res;});
    this.stateinService.currentMonthParam.subscribe(res=> {this.month = res;});
    this.monthInfo = this.month.length > 1 ? "Month : Multiple Value | ": "Month : "+this.month[0] +" | ";
    this.yearInfo = this.yearInfo.length > 1 ? "Year : Multiple Value | ": "Year : "+ this.year +" | ";
    this.branchInfo = this.branchInfo.length > 1 ? "BranchCode : Multiple Value | ":  "BranchCode : "+this.branch[0] +" | ";
  }
}
