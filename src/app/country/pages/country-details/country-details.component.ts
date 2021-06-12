import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '@country/services/country.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Country } from '@country/interfaces/country.interface';
import { ResetFiltersService } from '@country/services/reset-filters.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  country: Country | undefined;
  private destroy$ = new Subject<any>();

  constructor(
    private activateRoute: ActivatedRoute,
    private countrySvc: CountryService,
    private resetFilters: ResetFiltersService
  ) {}

  ngOnInit() {
    this.activateRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(({ id, country }) => {
          this.country = JSON.parse(country);
          return this.countrySvc.getCountryByAlpha(id);
        })
      )
      .subscribe((country) => (this.country = { ...this.country, ...country }));
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
    this.resetFilters.onResetFilters();
  }
}
