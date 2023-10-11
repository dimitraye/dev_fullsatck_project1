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
    this.chartData = [
      { name: "Zimbabwe", value: 12 },
      { name: "Madacascar", value: 36 },
      { name: "Taiwan", value: 167 },
      { name: "Canada", value: 159 },
      { name: "Antarctique", value: 78 }
    ];

    this.olympics$ = this.olympicService.getOlympics();
    this.numberOfCountries = 5;
    this.numberOfJos = 5;
  }

  onSelect(data: { name: string; value: number }): void {
    this.router.navigateByUrl(`details/${data.name}`);
  }



}
