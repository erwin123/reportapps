import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParambranchService } from '../services/parambranch.service';
import { StateinService } from '../services/statein.service';

@Component({
  selector: 'app-sidemenu',
  host: {
    '[class.is-collapsed]': 'collapsed'
  },
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  collapsed: boolean;
  traffic:boolean = true;
  selectedAllBranch: boolean = false;
  selectedAllMonth: boolean = false;
  branch: any;
  month:any;
  year:string[] = initYear;
  selectedYear:string;

  preventDoubleBranch:boolean=true;
  preventDoubleMonth:boolean=true;

  constructor(public paramService:ParambranchService, public stateInService:StateinService) { }

  currentMonth()
  {
    let date = new Date();
    let month = "0"+date.toLocaleString().split('/')[0];
    return month.substr(month.length - 2);
  }

  currentYear()
  {
    let date = new Date();
    let year = date.toLocaleString().split(',')[0];
    return year.substr(year.length - 4);
  }

  ngOnInit() {
    this.selectedYear = this.currentYear();
    this.collapsed = true;
    this.month = [
          {
            name: "January",
            code:"01",
            selected: false
          },
          {
            name: "February",
            code:"02",
            selected: false
          },
          {
            name: "March",
            code:"03",
            selected: false
          },
          {
            name: "April",
            code:"04",
            selected: false
          },
          {
            name: "May",
            code:"05",
            selected: false
          },
          {
            name: "June",
            code:"06",
            selected: false
          },
          {
            name: "July",
            code:"07",
            selected: false
          },
          {
            name: "August",
            code:"08",
            selected: false
          },
          {
            name: "September",
            code:"09",
            selected: false
          },
          {
            name: "October",
            code:"10",
            selected: false
          },
          {
            name: "November",
            code:"11",
            selected: false
          },
          {
            name: "December",
            code:"12",
            selected: false
          }
    ]

    this.month.forEach(element => {
      if(element.code === this.currentMonth())
      {
        element.selected = true;
      }
    });

    let objAnyArea:any;
    let objAnyBranch:any;

    let objArea:Area = new Area();
    let objListArea:Area[] =[objArea];

    let objBranch:Branch = new Branch();
    let objListBranch:Branch[] =[objBranch];

    this.paramService.getDataArea("area")
    .subscribe(res => {
      objAnyArea = res;
      if(objAnyArea.result)
      {
          objListArea.pop();
          objAnyArea.result.forEach(element => {
            objArea = new Area();
            objArea.type = element.BRANCH_NAME;
            objArea.code = element.BRANCH_CODE;
            objArea.expanded = element.BRANCH_CODE == "0001" ? true :false;
            objArea.selected = element.BRANCH_CODE == "0001" ? true :false;
            objArea.rights = [];
            objListArea.push(objArea);
          });
          this.branch = objListArea;
      }
    },error => {}
    ,()=>{
          this.paramService.getDataArea("branch")
          .subscribe(res => {
            objAnyBranch = res;
            if(objAnyBranch.result)
            { 
                objListBranch.pop();
                objAnyBranch.result.forEach(element => {
                  objBranch = new Branch();
                  objBranch.name = element.BRANCH_NAME;
                  objBranch.code = element.BRANCH_CODE;
                  objBranch.enable = false;
                  
                  objBranch.selected = element.BRANCH_CODE == "0102" ? true :false;
                  objListArea.find(res => res.code == element.BRANCH_PARENT).rights.push(objBranch);
                });
            }
          }
          );
          this.traffic = false;
        }
    );
  }

  onBranchClick()
  {
    setTimeout(()=>{
      let collBranchCodeSelected:string[] = [];
      this.branch.forEach(eachArea => {
        if(eachArea.selected)
        {
          eachArea.rights.forEach(eachBranch => {
            collBranchCodeSelected.push(eachBranch.code);
          });
        }
        else
        {
          eachArea.rights.forEach(eachBranch => {
            if(eachBranch.selected)
              collBranchCodeSelected.push(eachBranch.code);
          });
        }
      });

      if(collBranchCodeSelected.length==0)
        collBranchCodeSelected=[""];
      if(this.preventDoubleBranch)
      {
        this.stateInService.setParamBranch(collBranchCodeSelected);
        this.stateInService.setParamChange();
        this.preventDoubleBranch = false;
      }else{
        this.preventDoubleBranch = true;
      }
    }, 500);
  }

  onMonthClick()
  {
    setTimeout(()=>{
      let collMonthSelected:string[] = [];
      this.month.forEach(eachMonth => {
        if(eachMonth.selected)
        {
          collMonthSelected.push(eachMonth.code);
        }
      });  
      if(collMonthSelected.length==0)
        collMonthSelected=[""];
      if(this.preventDoubleMonth)
      {
        this.stateInService.setParamMonth(collMonthSelected);
        this.stateInService.setParamChange();
      }else{
        this.preventDoubleMonth = true;
      }
    }, 500);
  }

  onYearChange(year:string)
  {
    this.selectedYear = year;
    this.stateInService.setParamYear(year);
    this.stateInService.setParamChange();
  }


}

var initYear = ["2017", "2018", "2019", "2020"];

export class Area {
  type: string = "";
  expanded: boolean = true;
  selected: boolean = true;
  code:string = "";
  rights: Branch[] = null;
}

export class Branch{
  name:string = "";
  code:string = "";
  enable:boolean = true;
  selected:boolean = true;
  expanded: boolean = false;
}