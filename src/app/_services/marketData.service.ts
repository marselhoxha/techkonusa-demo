import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MarketDataService {
    public markekDataFromApi: any[]; 

  constructor(
      private http: HttpClient
    ) { }

    public getMarketData(apiRoutePath){
        return this.http.get(apiRoutePath);
    }

}