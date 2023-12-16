import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  numberOfJos! : number;
  numberOfCountries! : number;
  chartData : { name: string, value: number }[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {}

  

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympicService.getNumberOfCountries().subscribe((count) => {
      this.numberOfCountries = count;
    });


    this.olympicService.getOlympics().subscribe((olympics) => {
      if (olympics) {
        this.numberOfJos = olympics.length; // Nombre de jeux olympiques
      }
    });

    
    this.olympicService.getHomeChartData().subscribe((data) => {
      this.chartData = data;
    });
  }

  onSelect(data: { name: string; value: number }): void {
    this.router.navigateByUrl(`details/${data.name}`);
  }



}
