import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from '@country/pages/country-details/country-details.component';
import { SearchCountryComponent } from '@country/pages/search-country/search-country.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/search-country/name',
    pathMatch: 'full'
  },
  {
    path: 'search-country/:filter',
    component: SearchCountryComponent
  },
  {
    path: 'country-details/:id',
    component: CountryDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
