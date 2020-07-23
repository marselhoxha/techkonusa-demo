import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';

import { User } from '../_models';
import {
  UserService,
  AuthenticationService,
  MarketDataService,
  LoaderService,
  AlertService
} from '../_services';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  graphGenerated: Boolean = false;
  public options: any = {}

  constructor(
    public authenticationService: AuthenticationService,
    public userService: UserService,
    public marketDataService: MarketDataService,
    public loaderService: LoaderService,
    public alertService: AlertService,
    public router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  fetchData(apiJson) {
    this.alertService.destroy();
    this.marketDataService.getMarketData(apiJson).subscribe(
      data => {
        let marketData;
        marketData = data;
        let pointStartDate = '';
        let pointEndDate = '';
        let startYear = 0;
        let startMonth = 0;
        let startDay = 0;

        // Set Start Date for Graph:
        pointStartDate = marketData.dataset.oldest_available_date.replace(/-/g, '/');
        startYear = parseFloat(pointStartDate.substring(0, 4));
        startMonth = parseFloat(pointStartDate.substring(5, 7)) - 1;
        startDay = parseFloat(pointStartDate.substring(8.9));

        // Set End Date for Graph:
        pointEndDate = marketData.dataset.newest_available_date.replace(/-/g, '/');

        // Initialize high/low/mid arrays
        let highArray = [];
        let lowArray = [];
        let midArray = [];

        marketData.dataset.data.forEach(arrayItem => {
          // Initialize temp array 
          let initArray = arrayItem;

          // Push High/Low value into respective arrays
          highArray.push(initArray[2]);
          lowArray.push(initArray[3]);

          // Calculate Avg value and push into midArray
          let midValue = (arrayItem[2] + arrayItem[3]) / 2
          midArray.push(midValue);
        });

        // Set options for graph
        this.options = {
          rangeSelector: {
            enabled: true,
            selected: 3
          },
          tooltip: {
            valueDecimals: 2,
            valuePrefix: '$',
            valueSuffix: ' USD'
          },
          title: {
            text: marketData.dataset.name
          },
          xAxis: {
            type: 'datetime',
            min: new Date(pointStartDate).getTime(),
            max: new Date(pointEndDate).getTime()
          },
          plotOptions: {
            series: {
              pointStart: Date.UTC(startYear, startMonth, startDay),
              pointInterval: 24 * 3600 * 1000, // one day
            }
          },
          series: [
            {
              name: 'High',
              step: 'left',
              data: highArray
            },
            {
              name: 'Mid',
              step: 'center',
              data: midArray
            },
            {
              name: 'Low',
              step: 'right',
              data: lowArray
            }
          ]
        }

        this.graphGenerated = true;
        if (this.options != {} && this.graphGenerated === true) {

          Highcharts.chart('graphContainer', this.options);
        }
      },
      error => {
        Highcharts.chart('graphContainer', {});
        this.alertService.error(error);
      }
    )
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}