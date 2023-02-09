import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable} from "rxjs";
import {ICountry} from "../../models/country.interface";
import {COUNTRIES} from "../../graphql/graphql.queries";


@Injectable({
  providedIn: 'root'
})

export class CountryService {
  private allCountriesSubject: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);
  private countriesSubject: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);
  countries$: Observable<ICountry[]> = this.countriesSubject.asObservable();
  allCountries$: Observable<ICountry[]> = this.countriesSubject.asObservable();


  constructor(private apollo: Apollo) {
    this.apollo.watchQuery({
      query: COUNTRIES
    }).valueChanges.subscribe((result: any) => {
      this.setCountries(result.data?.countries);
      this.allCountriesSubject.next(result.data?.countries);
    });
  }

  setCountries(countries: ICountry[]) {
    this.countriesSubject.next(countries);
  }

  getCountriesByName(value: string): ICountry[] {
    return this.allCountriesSubject.value.filter((country: ICountry) => country.name.toLowerCase().includes(value.toLowerCase()));
  }

  getCountryByCode(code: string): ICountry {
    return this.allCountriesSubject.value.filter((country: ICountry) => country.code === code)[0];
  }
}
