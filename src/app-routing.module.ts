import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListByCountryComponent } from '@country/pages/list-by-country/list-by-country.component';

const routes: Routes = [
  {
    path: '',
    component: ListByCountryComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
