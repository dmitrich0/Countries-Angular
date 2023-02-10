import {Component, ElementRef, Input} from '@angular/core';
import {CountryService} from "../../services/countries-service/country.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-multibox',
  templateUrl: './multibox.component.html',
  styleUrls: ['./multibox.component.scss']
})
export class MultiboxComponent {
  @Input()
  public currencies: string[] = ['USD', 'EUR', 'RUB'];
  public checkboxesShown = false;

  constructor(
    private host: ElementRef<HTMLElement>,
    public countryService: CountryService
  ) {
  }

  showCheckboxes(): void {
    this.checkboxesShown = !this.checkboxesShown;
  }

  onChange(value: string) {
    let newCurrencies: string[] = [];
    this.countryService.currenciesInput$.pipe(
      // @ts-ignore
      switchMap((currencies: string[]) => {
        const idx = currencies.indexOf(value);
        if (idx != -1) {
          currencies.splice(idx, 1);
        } else {
          currencies.push(value);
        }
        newCurrencies = currencies;
      })
    ).subscribe();
    this.countryService.setCurrenciesInput(newCurrencies);
    this.countryService.setCountries(this.countryService.filterCurrencies());
  }
}
