import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, gql} from "apollo-angular";
import {MainListComponent} from "./components/main-list/main-list.component";
import {DetailedPageComponent} from "./components/detailed-page/detailed-page.component";
import {NameInputComponent} from "./components/name-input/name-input.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {CompanyCardComponent} from "./components/company-card/company-card.component";
import { ListFilterComponent } from './components/list-filter/list-filter.component';
import { RadioFilterComponent } from './components/radio-filter/radio-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MainListComponent,
    DetailedPageComponent,
    NameInputComponent,
    PaginationComponent,
    CompanyCardComponent,
    ListFilterComponent,
    RadioFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
