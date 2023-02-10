import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICountry} from "../../models/country.interface";
import {Apollo} from "apollo-angular";
import {Subscription} from "rxjs";
import {CountryService} from "../../services/countries-service/country.service";

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit, OnDestroy {
  countries!: ICountry[];
  countriesSub: Subscription | null = null;
  nameInputValue!: string;
  nameInputSub: Subscription | null = null;
  radioInputValue!: string;
  radioInputSub: Subscription | null = null;

  constructor(private apollo: Apollo, public countryService: CountryService) {
    this.countriesSub = this.countryService.countries$.subscribe(countries => this.countries = countries);
    this.nameInputSub = this.countryService.nameInput$.subscribe(value => this.nameInputValue = value);
    this.radioInputSub = this.countryService.radioInput$.subscribe(value => this.radioInputValue = value);
  }

  ngOnInit(): void {
  }

  onNameInputChange(value: string) {
    this.countryService.setCountries(this.countryService.getCountriesByName(value));
    this.countryService.setNameInput(value);
  }

  onRadioInputChange(continent: string) {
    console.log(this.radioInputValue);
    this.countryService.setCountries(this.countryService.getCountriesByContinent(continent));
    this.countryService.setRadioInput(continent);
  }

  ngOnDestroy(): void {
    if (this.countriesSub !== null) {
      this.countriesSub.unsubscribe();
      this.countriesSub = null;
    }
  }
}
