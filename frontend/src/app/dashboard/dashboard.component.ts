import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  multi = [
    {
      "name": "Leads",
      "series": [
        {
          "name": "03/22",
          "value": 2
        },
        {
          "name": "03/23",
          "value": 0
        },
        {
          "name": "03/24",
          "value": 3
        },
        {
          "name": "03/25",
          "value": 1
        },
        {
          "name": "03/26",
          "value": 1
        },
        {
          "name": "03/27",
          "value": 2
        },
        {
          "name": "03/28",
          "value": 0
        },
        {
          "name": "03/29",
          "value": 0
        },
        {
          "name": "03/30",
          "value": 1
        },
        {
          "name": "04/01",
          "value": 1
        },
        {
          "name": "04/02",
          "value": 2
        },
        {
          "name": "04/03",
          "value": 3
        },
      ]
    },
  ];

  sales = [
    {
      "name": "Sales",
      "series": [
        {
          "name": "03/22",
          "value": 12200
        },
        {
          "name": "03/23",
          "value": 14600
        },
        {
          "name": "03/24",
          "value": 14600
        },
        {
          "name": "03/25",
          "value": 14600
        },
        {
          "name": "03/26",
          "value": 16300
        },
        {
          "name": "03/27",
          "value": 16900
        },
        {
          "name": "03/28",
          "value": 16900
        },
        {
          "name": "03/29",
          "value": 16900
        },
        {
          "name": "03/30",
          "value": 21500
        },
        {
          "name": "04/01",
          "value": 21500
        },
        {
          "name": "04/02",
          "value": 23700
        },
        {
          "name": "04/03",
          "value": 24600
        },
      ]
    },
  ];
  

  view: any[] = [window.innerWidth, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  single = [
    {
      "name": "Facebook",
      "value": 7
    },
    {
      "name": "Google",
      "value": 21
    },
    {
      "name": "Flyers",
      "value": 15
    },
      {
      "name": "Other",
      "value": 10
    },
    {
      "name": "Referal",
      "value": 5
    }
  ];
  gradient: boolean = true;
  showLegend: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  constructor() {
  }


  ngOnInit(): void {
  }

}
