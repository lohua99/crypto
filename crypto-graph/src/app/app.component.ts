
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crypto-graph';

  public lineChartData: ChartDataSets[] = [];

  public colors : string[] = ['red', 'green', 'blue', 'black'];

  public lineChartLabels: Label[] = [];
  
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
  };
  public lineChartColors : Array<any> = [{ backgroundColor:"red" },
                                          { backgroundColor:"green" },
                                          { backgroundColor:"blue" },
                                          { backgroundColor:"black" }];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private http: HttpClient) {
    console.log(this.lineChartData);
    this.http.get('assets/crypto-prices.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 0; index < csvToRowArray.length; index++) {
              let row = csvToRowArray[index].split(",");
              if(index == 0) {
                  this.lineChartData.pop();
                  for(let col = 1; col < row.length; col++) {
                    let color = this.colors[col % this.colors.length]
                    let dataset = {data: new Array(), label: row[col].trim(), backgroundColor: color};
                    this.lineChartData.push(dataset);
                  }
              } else {
                this.lineChartLabels.push(row[0]);
                for(let col = 1; col < row.length; col++) {
                  this.lineChartData[col - 1].data.push(Number(row[col].trim()));
                }
              }
            }
        },
        error => {
            console.log(error);
        }
    );
  }
  // constructor() {}

  ngOnInit() {

  }
}

