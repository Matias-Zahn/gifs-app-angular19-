import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/Country.interfaces';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Loader } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink, JsonPipe, Loader],
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input.required<Country[]>();

  errorMesagge = input<Error>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
