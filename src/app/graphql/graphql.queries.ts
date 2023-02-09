import {gql} from "apollo-angular";

export const COUNTRY_BY_CODE = gql`
  query ($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currency
      phone
      continent {
        name
      }
    }
  }
`;

export const COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      currency
      phone
      continent {
        name
      }
    }
  }
`;
