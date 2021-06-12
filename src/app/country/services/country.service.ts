import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '@country/interfaces/country.interface';

export type CountryFilter = 'name' | 'capital' | 'region';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  filterCountry(filter: CountryFilter, term: string): Observable<Country[]> {
    const params = new HttpParams().set(
      'fields',
      'flag;name;capital;region;subregion;area;population;alpha2Code'
    );

    return this.http.get<Country[]>(`${this.apiUrl}/${filter}/${term}`, { params });
  }

  getCountryByAlpha(id: string): Observable<Country> {
    const params = new HttpParams().set(
      'fields',
      'nativeName;numericCode;alpha3Code;latlng;demonym;borders;callingCodes;currencies;languages;translations'
    );

    return this.http.get<Country>(`${this.apiUrl}/alpha/${id}`, { params });
  }
}
