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
      if (currencies.length === 3)
        return true;
      for (const currency of currencies) {
        if (country.currency === currency) {
          return true;
        }
      }
      return false;
    })
  }

  filterCurrencies(): ICountry[] {
    let nameFilter: string = '';
    let continentFilter: string = '';
    let currencyFilter: string[] = ['EUR', 'USD', 'RUB'];
    this.nameInput$.subscribe(value => nameFilter = value);
    this.radioInput$.subscribe(value => continentFilter = value);
    this.currenciesInput$.subscribe(value => currencyFilter = value);
    const filteredName = this.getCountriesByName(nameFilter);
    const filteredContinent = this.getCountriesByContinent(continentFilter);
    const filteredCurrency = this.getCountriesByCurrencies(currencyFilter);
    this.setPage(1);
    return filteredName.filter(country => filteredContinent.includes(country)).filter(country2 => filteredCurrency.includes(country2));
  }

  getCurrentCurrencies(): string[] {
    let currentCurrencies: string[] = [];
    this.currenciesInput$.subscribe(currencies => currentCurrencies = currencies);
    return currentCurrencies;
  }

  getCurrentCountries(): ICountry[] {
    let currentCountries: ICountry[] = [];
    this.countries$.subscribe(countries => currentCountries = countries);
    return currentCountries;
  }

  getPage(): number {
    let page: number = 1;
    this.page$.subscribe(value => page = value);
    return page;
  }
}
