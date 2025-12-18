import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, pipe, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/RestCountries.interfaces';
import { CountryMapper } from '../mapper/country.mapper';
import { Country } from '../interfaces/Country.interfaces';
import { Region } from '../interfaces/Region.interface';

const BASEURL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryServices {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    console.log(this.queryCacheCapital);

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${BASEURL}/capital/${query}`).pipe(
      map((res) => CountryMapper.RestCountryToCountryArray(res)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((err) => {
        return throwError(() => new Error(`No se pudo obtener paises con: ${query}`));
      })
    );
  }

  searchByCountry(country: string) {
    country = country.toLowerCase();

    if (this.queryCacheCountry.has(country)) {
      return of(this.queryCacheCountry.get(country) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${BASEURL}/name/${country}`).pipe(
      map((res) => CountryMapper.RestCountryToCountryArray(res)),
      tap((countries) => this.queryCacheCountry.set(country, countries)),
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

  searchByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${BASEURL}/region/${region}`).pipe(
      map((res) => CountryMapper.RestCountryToCountryArray(res)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((err) => {
        return throwError(() => new Error(`No se pudo obtener los paises de la region: ${region}`));
      })
    );
  }
}
