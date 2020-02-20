import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(public route:Router) { }
user:any[]=[];
  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
    });
    



    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user[0].role)
    if(this.user[0].role === "company"){
      this.route.navigate(["clients"]);
    }
    else if(this.user[0].role== "client"){
      this.route.navigate(["clientCars"]);
    }
    else if (this.user[0].role== "assurance"){
      this.route.navigate(["InsuranceClients"]); 

    }
    else if (this.user[0].role == "intervenantMedical"){
      
      this.route.navigate(["MedicPatients"]); 
    }else {
      this.route.navigate(["companies"]);
      
    }









  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
