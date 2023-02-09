import {Component, OnInit} from '@angular/core';
import {ICountry} from "../../models/country.interface";
import {Apollo} from "apollo-angular";
import {COUNTRIES} from "../../graphql/graphql.queries";

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit {
  countries!: ICountry[];

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: COUNTRIES
    }).valueChanges.subscribe((result: any) => {
      this.countries = result.data?.countries.slice(1, 10);
    })
  }
}
