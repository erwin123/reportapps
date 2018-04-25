import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';


@Injectable()
export class StateinService {
  paramChange: EventEmitter<boolean> = new EventEmitter();

  private yearParam = new BehaviorSubject<string>(this.currentYear());
  currentYearParam = this.yearParam.asObservable();

  private branchParam = new BehaviorSubject<string[]>(["0102"]); //kelapa gading
  currentBranchParam = this.branchParam.asObservable();

  private monthParam = new BehaviorSubject<string[]>([this.currentMonth()]);
  currentMonthParam = this.monthParam.asObservable();

  private existTraffic = new BehaviorSubject<boolean>(false);
  currentExistTraffic = this.existTraffic.asObservable();


  public stackTraffic:string[]=[""];
  constructor() { }

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
  
  setParamChange() {
      this.paramChange.emit();
  };

  setParamYear(year:string)
  {
    this.yearParam.next(year);
  }

  setParamBranch(branch:string[])
  {
    this.branchParam.next(branch);
  }

  setParamMonth(month:string[])
  {
    this.monthParam.next(month);
  }

  setTraffic(existTraffic: boolean){
    this.existTraffic.next(existTraffic);
  }

  setStackTraffic(objectTraffic:string)
  {
    this.stackTraffic.push(objectTraffic);
  }

  removeStackTraffic(objectTraffic:string)
  {
    const index: number = this.stackTraffic.indexOf(objectTraffic);
    if (index !== -1) {
        this.stackTraffic.splice(index, 1);
    }
  }

  getStackTraffic(objectTraffic:string):Observable<string[]>
  {
    return of(this.stackTraffic.filter(val => val == objectTraffic));
  }

  isAnyTraffic()
  {
    if(this.stackTraffic.length>1)
      return true;
    else
      return false;
  }
}
