import { Component } from '@angular/core';
import {CountryService} from "../../services/countries-service/country.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  constructor(public countryService: CountryService) {
  }
  prevPage() {
    if (this.countryService.getPage() != 1)
      this.countryService.setPage(this.countryService.getPage() - 1)
  }
  nextPage() {
    if (this.countryService.getPage() + 1 <= Math.ceil(this.countryService.getCurrentCountries().length / 10))
        this.countryService.setPage(this.countryService.getPage() + 1)
  }
}
