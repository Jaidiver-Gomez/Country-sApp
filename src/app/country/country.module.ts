import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListByCapitalComponent } from './pages/list-by-capital/list-by-capital.component';
import { ListByCountryComponent } from './pages/list-by-country/list-by-country.component';
import { ListByRegionComponent } from './pages/list-by-region/list-by-region.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

const components = [
  ListByCapitalComponent,
  ListByCountryComponent,
  ListByRegionComponent,
  CountryDetailsComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...components,
  ],
})
export class CountryModule { }
