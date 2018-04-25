import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CountappsService {
  public apiUrl:string = 'http://10.20.14.59/MUFDealer/report';
  constructor(private http:HttpClient) { }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json'); 
  }

  getDataReport(month:string[], year:string[], branch:string[], sourceapp:string[]=["01", "02", "03", "04", "05"]) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    
    return this.http.post<Object[]>(this.apiUrl, {MONTH:month, YEAR:year, BRANCH_CODE:branch, SOURCE_APP_CODE:sourceapp}).map(
        res => {
          if(res)
            return res;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        }
      );
  }

  getDataReportRaw(month:string[], year:string[], branch:string[], sourceapp:string[]=["01", "02", "03", "04", "05"]) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    
    return this.http.post<Object[]>(this.apiUrl+"_raw", {MONTH:month, YEAR:year, BRANCH_CODE:branch, SOURCE_APP_CODE:sourceapp}).map(
        res => {
          if(res)
            return res;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        }
      );
  }

  getDataReportByMonth(month:string[], year:string[], branch:string[], sourceapp:string[]=["01", "02", "03", "04", "05"]) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    let apiUrl2 = "http://10.20.14.59/MUFDealer/group_by_month";
    return this.http.post<Object[]>(apiUrl2, {MONTH:month, YEAR:year, BRANCH_CODE:branch, SOURCE_APP_CODE:sourceapp}).map(
        res => {
          if(res)
            return res;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        }
      );
  }
}
