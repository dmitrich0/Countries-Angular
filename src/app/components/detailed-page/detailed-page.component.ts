import {Component, OnInit} from '@angular/core';
import {ICountry} from "../../models/country.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Apollo} from "apollo-angular";
import {CountryService} from "../../services/countries-service/country.service";

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss']
})
export class DetailedPageComponent implements OnInit {
  country!: ICountry;
  countryCode!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apollo: Apollo,
    private countryService: CountryService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.countryCode = params['code']);
    this.country = this.countryService.getCountryByCode(this.countryCode);
  }

  navigateToHome(): void {
    this.router.navigate(['../../']);
  }
}
