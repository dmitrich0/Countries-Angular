import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICountry} from "../../models/country.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {Apollo} from "apollo-angular";
import {CountryService} from "../../services/countries-service/country.service";

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss']
})
export class DetailedPageComponent implements OnInit, OnDestroy {
  // @ts-ignore
  country: ICountry;
  countryCode!: string;
  // loading!: boolean;
  // private querySubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apollo: Apollo,
    private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.countryCode = params['code']);
    this.country = this.countryService.getCountryByCode(this.countryCode);
    // this.querySubscription = this.apollo.watchQuery({
    //   query: COUNTRY_BY_CODE,
    //   variables: {"code": this.countryCode}
    // }).valueChanges.subscribe((result: any) => {
    //   this.loading = result.loading;
    //   this.country = result.data.country;
    // });
  }

  ngOnDestroy(): void {
  }
}
