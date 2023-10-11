import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})

export class DetailsComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  chartData = [
    {
      "name": "Karthikeyan",
      "series": [
        {
          "name": "2016",
          "value": "15000"
        },
        {
          "name": "2017",
          "value": "20000"
        },
        {
          "name": "2018",
          "value": "25000"
        },
        {
          "name": "2019",
          "value": "30000"
        }
      ],
    }  
  ];

  public view: any = [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: string="Dates";
  public showYAxisLabel = true;
  public graphDataChart!: any[];
  public colorScheme : any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  numberOfEntries! : number;
  numberOfMedals! : number;
  numberOfAthletes! : number;
  countryName! : string;


  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.numberOfEntries = 5;
    this.numberOfMedals = 5;
    this.numberOfAthletes = 5;
    this.countryName = 'Japon';
  }

  
}
