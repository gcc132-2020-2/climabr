import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import localePt from '@angular/common/locales/pt';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FakeCityRepository } from 'src/data/fake/fake-city-repository';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { LoadWeatherService } from 'src/domain/services/load-weather.service';
import { FakeWeatherRepository } from 'src/data/fake/fake-weather-repository';

const createSearchCityService = () => {
  return new SearchCityService(new FakeCityRepository());
};

const createLoadWeatherService = () => {
  return new LoadWeatherService(
    new FakeCityRepository(),
    new FakeWeatherRepository()
  );
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SearchCityService,
      useFactory: createSearchCityService,
    },
    { provide: LoadWeatherService, useFactory: createLoadWeatherService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
