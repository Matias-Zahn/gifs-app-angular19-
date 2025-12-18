import type { Country } from '../interfaces/Country.interfaces';
import type { RESTCountry } from '../interfaces/RestCountries.interfaces';

export class CountryMapper {
  static RestCountryToCountry(item: RESTCountry): Country {
    return {
      cca2: item.cca2,
      capital: item.capital.join(', '),
      flag: item.flag,
      flagSvg: item.flags.svg,
      nameOfficial: item.name.official,
      name: item.translations['spa'].common ?? 'No spanish name',
      population: item.population,
      region: item.region,
      subregion: item.subregion
    };
  }

  static RestCountryToCountryArray(items: RESTCountry[]): Country[] {
    return items.map((country) => CountryMapper.RestCountryToCountry(country));
  }
}
