import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  //private olympics$ = new BehaviorSubject<any>(undefined);
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    //return this.http.get<any>(this.olympicUrl).pipe(
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getNumberOfCountries(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics) => {
        if (!olympics) return 0;
        return olympics.length;
      })
    );
  }

  /*getNumberOfJos() {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => { // Spécifiez le type d'olympics
        if (!olympics) return 0;
        return olympics.reduce(
          (totalJos: number, country: any) => totalJos + country.participations.length,
          0
        );
      })
    );
  }*/

  getNumberOfJos(): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[] | null) => {
        if (!olympics) return 0;
        return olympics.reduce(
          (totalJos: number, country: Olympic) => totalJos + country.participations.length,
          0
        );
      })
    );
  }

  /*getNumberOfEntries(countryName : string) {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => { // Spécifiez le type d'olympics
        if (olympics && countryName) {
          // Recherchez le pays dans la liste des Jeux Olympiques
          const country = olympics.find((c: any) => c.country === countryName);
      
          if (country) {
            // Utilisez la longueur du tableau 'participations' pour obtenir le nombre d'entrées
            return country.participations.length;
          }
        }
        return 0;
      })
    );
  }*/

  getNumberOfEntries(countryName: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[] | null) => {
        if (olympics && countryName) {
          // Recherchez le pays dans la liste des Jeux Olympiques
          const country = olympics.find((c: Olympic) => c.country === countryName);
      
          if (country) {
            // Utilisez la longueur du tableau 'participations' pour obtenir le nombre d'entrées
            return country.participations.length;
          }
        }
        return 0;
      })
    );
  }

  /*getNumberOfMedals(countryName : string) {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => { // Spécifiez le type d'olympics
        if (olympics && countryName) {
          // Recherchez le pays dans la liste des Jeux Olympiques
          const country = olympics.find((c: any) => c.country === countryName);
      
          if (country) {
            // Utilisez reduce pour additionner le nombre de médailles de chaque participation
            return country.participations.reduce((totalMedals: number, participation: any) => {
              return totalMedals + participation.medalsCount;
            }, 0);
          }
        }
        return 0;
      })
    );
  }*/

  getNumberOfMedals(countryName: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[] | null) => {
        if (olympics && countryName) {
          // Recherchez le pays dans la liste des Jeux Olympiques
          const country = olympics.find((c: Olympic) => c.country === countryName);
      
          if (country) {
            // Utilisez reduce pour additionner le nombre de médailles de chaque participation
            return country.participations.reduce((totalMedals: number, participation: any) => {
              return totalMedals + participation.medalsCount;
            }, 0);
          }
        }
        return 0;
      })
    );
  }

  /*getNumberOfAthletes(countryName : string) {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => { // Spécifiez le type d'olympics
        if (olympics && countryName) {
          // Recherchez le pays dans la liste des Jeux Olympiques
          const country = olympics.find((c: any) => c.country === countryName);
      
          if (country) {
            // Utilisez reduce pour additionner le nombre d'athlètes de chaque participation
            return country.participations.reduce((totalAthletes: number, participation: any) => {
              return totalAthletes + participation.athleteCount;
            }, 0);
          }
        }
        return 0;
      })
    );
  }*/

  getNumberOfAthletes(countryName: string): Observable<number> {
    return this.olympics$.pipe(
      map((olympics: Olympic[] | null) => {
        if (olympics && countryName) {
          // Recherchez le pays dans la liste des Jeux Olympiques
          const country = olympics.find((c: Olympic) => c.country === countryName);
      
          if (country) {
            // Utilisez reduce pour additionner le nombre d'athlètes de chaque participation
            return country.participations.reduce((totalAthletes: number, participation: any) => {
              return totalAthletes + participation.athleteCount;
            }, 0);
          }
        }
        return 0;
      })
    );
  }

  /*getHomeChartData() {
    return this.olympics$.pipe(
      map((olympics: any) => { // Spécifiez le type d'olympics
        if (!olympics) return [];
        
        // Créez un tableau de paires name/value en utilisant les données du fichier JSON
        return olympics.map((country: any) => ({
          name: country.country,
          value: country.participations.reduce(
            (totalMedals: number, participation: any) => totalMedals + participation.medalsCount,
            0
          ),
        }));
      })
    );
  }*/

  getHomeChartData(): Observable<{ name: string, value: number }[]> {
    return this.olympics$.pipe(
      map((olympics: Olympic[] | null) => {
        if (!olympics) return [];
        
        // Créez un tableau de paires name/value en utilisant les données du fichier JSON
        return olympics.map((country: Olympic) => ({
          name: country.country,
          value: country.participations.reduce(
            (totalMedals: number, participation: any) => totalMedals + participation.medalsCount,
            0
          ),
        }));
      })
    );
  }

  /*getCountryChartData(countryName: string): Observable<{ name: string, series: { name: string, value: number }[] }> {
    return this.olympics$.pipe(
      map((olympics: any) => {
        if (!olympics) return { name: '', series: [] }; // Retourne une valeur par défaut

        // Recherchez le pays dans la liste des Jeux Olympiques
        const country = olympics.find((c: any) => c.country === countryName);

        if (country) {
          // Utilisez la méthode map pour créer un tableau de paires name/value
          return {
            name: countryName,
            series: country.participations.map((participation: any) => ({
              name: participation.year.toString(),
              value: participation.medalsCount,
            })),
          };
        } else {
          return { name: '', series: [] }; // Retourne une valeur par défaut
        }
      })
    );
  }*/

  getCountryChartData(countryName: string): Observable<{ name: string, series: { name: string, value: number }[] }> {
    return this.olympics$.pipe(
      map((olympics: Olympic[] | null) => {
        if (!olympics) return { name: '', series: [] }; // Retourne une valeur par défaut

        // Recherchez le pays dans la liste des Jeux Olympiques
        const country = olympics.find((c: Olympic) => c.country === countryName);

        if (country) {
          // Utilisez la méthode map pour créer un tableau de paires name/value
          return {
            name: countryName,
            series: country.participations.map((participation: any) => ({
              name: participation.year.toString(),
              value: participation.medalsCount,
            })),
          };
        } else {
          return { name: '', series: [] }; // Retourne une valeur par défaut
        }
      })
    );
  }

  getCountryNames(): Observable<string[]> {
    return this.olympics$.pipe(
      map((olympics: Olympic[] | null) => {
        if (!olympics) return [];
  
        // Utilisez la méthode map pour extraire les noms de pays
        return olympics.map((country: Olympic) => country.country);
      })
    );
  }

}
