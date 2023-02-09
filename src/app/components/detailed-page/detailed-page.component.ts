import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ICountry} from "../../models/country.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {Apollo} from "apollo-angular";
import {COUNTRIES, COUNTRY_BY_CODE} from "../../graphql/graphql.queries";

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss']
})
export class DetailedPageComponent implements OnInit, OnDestroy {
  // @ts-ignore
  country: ICountry;
  countryCode!: string;
  loading!: boolean;
  private querySubscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.countryCode = params['code']);
    this.querySubscription = this.apollo.watchQuery({
      query: COUNTRY_BY_CODE,
      variables: {"code": this.countryCode}
    }).valueChanges.subscribe((result: any) => {
      this.loading = result.loading;
      this.country = result.data.country;
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
