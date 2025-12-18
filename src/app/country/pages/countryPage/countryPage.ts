import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryServices } from '../../services/country-services';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { Loader } from '../../../shared/components/loader/loader';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, Loader, CountryInformation],
  templateUrl: './countryPage.html',
})
export class CountryPage {
  countryCode = inject(ActivatedRoute).snapshot.params['countryCode'];
  countryService = inject(CountryServices);

  countryResource = rxResource({
    params: () => ({ countryCode: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.countryCode);
    },
  });
}
