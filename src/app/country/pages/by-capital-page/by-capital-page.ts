import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryServices } from '../../services/country-services';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export default class ByCapitalPage {
  countriesServices = inject(CountryServices);
  query = signal('');

  countryResoruce = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countriesServices.searchByCapital(params.query);
    },
  });

  // countries = signal<Country[]>([]);
  // isLoading = signal(false);
  // isError = signal<string | null>(null);

  // recibirValor(query: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.countriesServices.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false), this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false),
  //         this.countries.set([]),
  //         this.isError.set(`No se encontro un país con esa capital: ${query}`);
  //     },
  //   });
  // }
}
