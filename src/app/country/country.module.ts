import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { RouterModule } from '@angular/router';
import { SearchCountryComponent } from './pages/search-country/search-country.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [CountryDetailsComponent];

@NgModule({
  declarations: [
    CountryInputComponent,
    CountryTableComponent,
    ...components,
    SearchCountryComponent
  ],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [...components, CountryInputComponent]
})
export class CountryModule {}
