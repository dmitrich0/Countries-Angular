import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ICountry} from "../../models/country.interface";
import {COUNTRIES} from "../../graphql/graphql.queries";


@Injectable({
  providedIn: 'root'
})

export class CountryService {
  private allCountriesSubject: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);
  private countriesSubject: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);
  private nameInputSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private radioInputSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  querySubscription: Subscription;
  countries$: Observable<ICountry[]> = this.countriesSubject.asObservable();
  allCountries$: Observable<ICountry[]> = this.countriesSubject.asObservable();
  nameInput$: Observable<string> = this.nameInputSubject.asObservable();
  radioInput$: Observable<string> = this.radioInputSubject.asObservable();
  isLoading: boolean = true;


  constructor(private apollo: Apollo) {
    this.querySubscription = this.apollo.watchQuery({
      query: COUNTRIES,
      notifyOnNetworkStatusChange: true
    }).valueChanges.subscribe(({data, loading}) => {
      this.isLoading = loading;
      // @ts-ignore
      this.setCountries(data?.countries);
      // @ts-ignore
      this.allCountriesSubject.next(data?.countries);
    })
  }

  setCountries(countries: ICountry[]): void {
    this.countriesSubject.next(countries);
  }

  setNameInput(value: string): void {
    this.nameInputSubject.next(value);
  }

  setRadioInput(value: string): void {
    this.radioInputSubject.next(value);
  }

  getCountriesByName(value: string): ICountry[] {
    return this.allCountriesSubject.value.filter((country: ICountry) => country.name.toLowerCase().includes(value.toLowerCase()));
  }

  getCountryByCode(code: string): ICountry {
    return this.allCountriesSubject.value.filter((country: ICountry) => country.code === code)[0];
  }

  getCountriesByContinent(continent: string): ICountry[] {
    return this.allCountriesSubject.value.filter((country: ICountry) => country.continent.name.includes(continent));
  }
}
