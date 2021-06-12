import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CountryModule } from '@country/country.module';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CountryModule, SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
