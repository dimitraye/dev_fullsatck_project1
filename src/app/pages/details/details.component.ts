import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})

export class DetailsComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public chartData: { name: string, series: { name: string, value: number }[] }[] = [];
  public  numberOfEntries! : number;
  public numberOfMedals! : number;
  public numberOfAthletes! : number;
  public countryName! : string;
  public countryNames: string[] = [];
  public view: [number, number] = [700, 400];
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


  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.olympicService.getCountryNames().subscribe((names) => {
      this.countryNames = names;
    });

    this.route.paramMap.subscribe(params => {
      // J'utilise la méthode get() pour récupérer la valeur du paramètre "id"
      const newCountryName = params.get('countryName') || '';
    
      // Vérifie si la nouvelle valeur est dans la liste des countryNames ou est vide
      if (this.countryNames.includes(newCountryName) || newCountryName === '') {
        this.countryName = newCountryName;
      } else {
        this.countryName = '**';
      }
    
      console.log('countryName récupéré de l\'URL : ', this.countryName);
    });

    this.olympics$ = this.olympicService.getOlympics();
    
    this.olympicService.getNumberOfEntries(this.countryName).subscribe((count) => {
      this.numberOfEntries = count;
    });

    this.olympicService.getNumberOfMedals(this.countryName).subscribe((count) => {
      this.numberOfMedals = count;
    });

    this.olympicService.getNumberOfAthletes(this.countryName).subscribe((count) => {
      this.numberOfAthletes = count;
    });

    this.olympicService.getCountryChartData(this.countryName).subscribe((countryChartData) => {
      if (countryChartData) {
        this.chartData = [countryChartData];
      }
    });
  }

  
}
