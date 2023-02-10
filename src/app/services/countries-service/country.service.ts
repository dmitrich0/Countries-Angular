import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ICountry, ICountryQuery} from "../../models/country.interface";
import {COUNTRIES} from "../../graphql/graphql.queries";


@Injectable({
  providedIn: 'root'
})

export class CountryService {
  private allCountriesSubject: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);
  private countriesSubject: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>([]);
  private nameInputSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private radioInputSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private currenciesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['EUR', 'USD', 'RUB']);
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  querySubscription: Subscription;
  countries$: Observable<ICountry[]> = this.countriesSubject.asObservable();
  allCountries$: Observable<ICountry[]> = this.countriesSubject.asObservable();
  nameInput$: Observable<string> = this.nameInputSubject.asObservable();
  radioInput$: Observable<string> = this.radioInputSubject.asObservable();
  currenciesInput$: Observable<string[]> = this.currenciesSubject.asObservable();
  page$: Observable<number> = this.pageSubject.asObservable();
  isLoading: boolean = true;


  constructor(private apollo: Apollo) {
    this.querySubscription = this.apollo.watchQuery<ICountryQuery>({
      query: COUNTRIES,
      notifyOnNetworkStatusChange: true
    }).valueChanges.subscribe(({data, loading}) => {
      this.isLoading = loading;
      this.setCountries(data?.countries);
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

  setPage(value: number): void {
    this.pageSubject.next(value);
  }

  setCurrenciesInput(value: string[]): void {
    this.currenciesSubject.next(value);
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

  getCountriesByCurrencies(currencies: string[]): ICountry[] {
    return this.allCountriesSubject.value.filter((country: ICountry) => {
      return currencies.includes(country.currency) || currencies.length === 3;
    });
  }

  filterCurrencies(): ICountry[] {
    const filteredName = this.getCountriesByName(this.nameInputSubject.value);
    const filteredContinent = this.getCountriesByContinent(this.radioInputSubject.value);
    const filteredCurrency = this.getCountriesByCurrencies(this.currenciesSubject.value);
    this.setPage(1);
    return filteredName.filter(country => filteredContinent.includes(country)).filter(country2 => filteredCurrency.includes(country2));
  }

  getCurrentCurrencies(): string[] {
    return this.currenciesSubject.value;
  }

  getCurrentCountries(): ICountry[] {
    return this.countriesSubject.value;
  }

  getPage(): number {
    return this.pageSubject.value;
  }
}
