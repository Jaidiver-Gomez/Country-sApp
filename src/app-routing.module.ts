import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { ListByCountryComponent } from '@country/pages/list-by-country/list-by-country.component';

const routes: Routes = [
  {
    path: '',
    component: ListByCountryComponent,
  },
];

@NgModule({
  imports: [],
  exports: [],
})
export class AppRoutingModule {

}
