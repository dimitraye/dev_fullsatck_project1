import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  numberOfJos! : number;
  numberOfCountries! : number;
  chartData : { name: string, value: number }[] = [];
  private subscriptions: Subscription[] = [];


  constructor(private olympicService: OlympicService, private router: Router) {}

  

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  
    this.subscriptions.push(
      this.olympicService.getNumberOfCountries().subscribe((count) => {
        this.numberOfCountries = count;
      })
    );
  
    this.subscriptions.push(
      this.olympicService.getOlympics().subscribe((olympics) => {
        if (olympics) {
          this.numberOfJos = olympics.length; // Nombre de jeux olympiques
        }
      })
    );
  
    this.subscriptions.push(
      this.olympicService.getHomeChartData().subscribe((data) => {
        this.chartData = data;
      })
    );
    }
  
    ngOnDestroy(): void {
    // Désinscrire toutes les souscriptions lors de la destruction du composant
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  

  onSelect(data: { name: string; value: number }): void {
    this.router.navigateByUrl(`details/${data.name}`);
  }



}
