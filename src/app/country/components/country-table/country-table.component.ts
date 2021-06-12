import { Component, Input, OnDestroy } from '@angular/core';
import { Country } from '@country/interfaces/country.interface';
import { ResetFiltersService } from '@country/services/reset-filters.service';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent implements OnDestroy {
  @Input() countries: Country[] = [];

  constructor(private resetFilters: ResetFiltersService) {}

  ngOnDestroy() {
    this.resetFilters.onResetFilters();
  }
}
