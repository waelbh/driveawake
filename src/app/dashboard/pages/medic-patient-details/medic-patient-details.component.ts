import { Component, OnInit } from '@angular/core';
import { DataCarService } from 'src/app/services/UserService/data-car.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import Chart from 'chart.js';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample1Hart
} from "../../variables/charts";
import { count } from 'rxjs/operators';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';

declare const google: any;
@Component({
  selector: 'app-medic-patient-details',
  templateUrl: './medic-patient-details.component.html',
  styleUrls: ['./medic-patient-details.component.scss']
})
export class MedicPatientDetailsComponent implements OnInit {
  private dataCar: any = {};
  private alldataCar: any[] = [];
  private a: any = {};
  private dataDate: any;
medic:IntervenantMedicale=new IntervenantMedicale();
id:any;

  //stat
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  constructor(private datacarservice: DataCarService, private route: ActivatedRoute, private companyservices: CompanyServices) {



  }

  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.datacarservice.getCarData(this.route.snapshot.params.ref).subscribe(data => {

      this.dataCar = data[data.length - 1];
      this.alldataCar = data;
      this.dataDate = new Date(this.dataCar.date["seconds"] * 1000);
      let user = JSON.parse(localStorage.getItem('user'));
      //get by id
      console.log(user[0].roleRefId); 
      this.companyservices.getCarsinfobyClient(this.id, this.dataCar.reference).subscribe(data => {
        this.a = data[0];
        console.log(this.a);
      });
    







      //stat
      this.datasets = [
        [0, 20, 10, 30, 15, 40, 20, 60, 60],
        [0, 20, 5, 25, 10, 30, 15, 40, 40]
      ];
      this.data = this.datasets[0];


      var chartOrders = document.getElementById('chart-orders');

      parseOptions(Chart, chartOptions());


      var chartHartRate = document.getElementById('chart-sales1');

      var chartSales = document.getElementById('chart-sales');

      //HartRate 

      var datadynamiqueHart = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [{
          label: 'Hart Rate',
          data: [0, 20, 10, 30, 15, 40, 20, 60, 60, 70, 80]
        }]
      }

      var sorteddataHart = {
        labels: [],
        data: []
      }
      let counterHart = 0;
      for (let a of this.alldataCar.reverse()) {
        counterHart = counterHart + 1;
        if (counterHart <= 10) {
          let date = new Date(a.date["seconds"] * 1000);
          sorteddataHart.labels.push(date.getHours() + ":" + date.getMinutes());
          sorteddataHart.data.push(a.battement);
        }

      }
      datadynamiqueHart.labels = sorteddataHart.labels;
      datadynamiqueHart.datasets[0].data = sorteddataHart.data;

      this.salesChart = new Chart(chartHartRate, {
        type: 'line',
        options: chartExample1Hart.options,
        data: datadynamiqueHart
      });




      //temperature
      var datadynamique = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [{
          label: 'Temp',
          data: [0, 20, 10, 30, 15, 40, 20, 60, 60, 70, 80]
        }]
      }

      var sorteddata = {
        labels: [],
        data: []
      }
      let counter = 0;
      for (let a of this.alldataCar.reverse()) {
        counter = counter + 1;
        if (counter <= 10) {
          let date = new Date(a.date["seconds"] * 1000);
          sorteddata.labels.push(date.getHours() + ":" + date.getMinutes());
          sorteddata.data.push(a.temperature);
        }

      }
      datadynamique.labels = sorteddata.labels.reverse();
      datadynamique.datasets[0].data = sorteddata.data.reverse();

      this.salesChart = new Chart(chartSales, {
        type: 'line',
        options: chartExample1.options,
        data: datadynamique
      });

      var datadynamiqueforallcool = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [{
          label: 'Alcool',
          data: [0, 20, 10, 30, 15, 40, 20, 60, 60, 70, 80]
        }]
      }

      var sorteddataa = {
        labels: [],
        data: []
      }
      let counterone = 0;
      for (let a of this.alldataCar.reverse()) {
        counterone = counterone + 1;
        if (counterone <= 10) {
          let date = new Date(a.date["seconds"] * 1000);
          sorteddataa.labels.push(date.getHours() + ":" + date.getMinutes());
          sorteddataa.data.push(a.alcool);
        }

      }
      datadynamiqueforallcool.labels = sorteddataa.labels;
      datadynamiqueforallcool.datasets[0].data = sorteddataa.data;

      var ordersChart = new Chart(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: datadynamiqueforallcool
      });



      

    

    
    




    });//close request data


  }






  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
