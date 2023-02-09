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
  nameInputValue: string | null = null;

  constructor(private apollo: Apollo, public countryService: CountryService) {
    this.countriesSub = this.countryService.countries$.subscribe(countries => this.countries = countries);
  }

  ngOnInit(): void {
  }

  onNameInputChange(value: string | null) {
    value = value ? value : ""
    this.countryService.setCountries(this.countryService.getCountriesByName(value));
  }

  ngOnDestroy(): void {
    if (this.countriesSub !== null) {
      this.countriesSub.unsubscribe();
      this.countriesSub = null;
    }
  }
}
