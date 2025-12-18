import { Component, inject, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountryServices } from '../../services/country-services';
import { Region } from '../../interfaces/Region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { Loader } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList, NotFound, Loader],
  templateUrl: './by-region-page.html',
})
export default class ByRegionPage {
  private countryService: CountryServices = inject(CountryServices);
  public buttomRegion = signal<Region>('Africa');

  countryResource = rxResource({
    params: () => ({ query: this.buttomRegion() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByRegion(params.query);
    },
  });

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
}
