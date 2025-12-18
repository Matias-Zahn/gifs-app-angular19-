import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, pipe, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/RestCountries.interfaces';
import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/Country.interfaces';

const BASEURL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryServices {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${BASEURL}/capital/${query}`).pipe(
      map((res) => CountryMapper.RestCountryToCountryArray(res)),
      catchError((err) => {
        return throwError(() => new Error(`No se pudo obtener paises con: ${query}`));
      })
    );
  }

  searchByCountry(country: string) {
    country = country.toLowerCase();

    return this.http.get<RESTCountry[]>(`${BASEURL}/name/${country}`).pipe(
      map((res) => CountryMapper.RestCountryToCountryArray(res)),
      delay(2000),
      catchError((err) => {
        return throwError(() => new Error(`No se pudo obtener el pais con el nombre: ${country}`));
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${BASEURL}/alpha/${code}`).pipe(
      map((res) => CountryMapper.RestCountryToCountryArray(res)),
      map((countries) => countries.at(0)),
      delay(2000),
      catchError((err) => {
        return throwError(() => new Error(`No se pudo obtener el pais con el codigo: ${code}`));
      })
    );
  }
}
