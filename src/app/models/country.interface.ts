export interface ICountry {
  code: string;
  name: string;
  capital: string;
  currency: string;
  phone: string;
  continent: Continent;
}

export interface ICountryQuery {
  countries: ICountry[];
}

export interface Continent {
  name: string;
}
