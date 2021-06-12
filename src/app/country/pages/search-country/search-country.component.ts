import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '@country/interfaces/country.interface';
import { CountryFilter, CountryService } from '@country/services/country.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetFiltersService } from '@country/services/reset-filters.service';

type Regions = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.css']
})
export class SearchCountryComponent implements OnInit, OnDestroy {
  term: string = '';
  hasError: boolean = false;
  countries: Country[] = [];
  filter: CountryFilter = 'name';
  regions: Regions[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  form: FormGroup;
  onResetInput: boolean = false;
  suggestionCountries: Country[] | undefined;
  private destroy$ = new Subject<any>();

  constructor(
    private countrySvc: CountryService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    public resetFilters: ResetFiltersService
  ) {
    this.form = new FormGroup({
      region: new FormControl('', Validators.required)
    });
  }

  get regionSelected() {
    const { region } = this.form.controls;
    return region.value;
  }

  search(term: string) {
    this.hasError = false;
    this.term = term;

    this.countrySvc.filterCountry(this.filter, term).subscribe(
      (countries) => {
        this.countries = countries;
      },
      () => {
        this.countries = [];
        this.hasError = true;
      }
    );
  }

  suggestions(term: string) {
    this.hasError = false;
    this.term = term;

    this.countrySvc
      .filterCountry('name', term)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (countries) => (this.suggestionCountries = countries.slice(0, 5)),
        () => (this.suggestionCountries = [])
      );
  }

  ngOnInit() {
    this.activateRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ filter }) => {
      if (filter !== this.filter) {
        this.countries = [];
        this.onResetInput = true;
        this.filter = filter;
      }
    });

    this.router.navigate([`/search-country/name`]).then();
    this.form.controls.region.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((region) => {
      this.search(region);
    });
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
