import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './countryPage.html',
})
export class CountryPage {

  country = inject(ActivatedRoute).params.subscribe((country) => console.log(country))

 }
