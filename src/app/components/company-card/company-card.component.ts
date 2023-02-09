import {Component, Input, OnInit} from '@angular/core';
import {ICountry} from "../../models/country.interface";
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() country!: ICountry;

  constructor(private apollo: Apollo, private router: Router) {
  }

  ngOnInit(): void {
  }

  navigateToDetailedPage(code:  string) {
    this.router.navigate(['/country/', code]);
  }
}
