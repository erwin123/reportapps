import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ParambranchService {
  public apiUrl:string = 'http://10.20.14.59/MUFDealer/list_';
  constructor(private http:HttpClient) { }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json'); 
  }

  getDataArea(typeArea:string) {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    
    return this.http.get<Object[]>(this.apiUrl+typeArea).map(
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
