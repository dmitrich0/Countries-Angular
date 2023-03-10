import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {MainListComponent} from "./components/main-list/main-list.component";
import {DetailedPageComponent} from "./components/detailed-page/detailed-page.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {CompanyCardComponent} from "./components/company-card/company-card.component";
import {FormsModule} from "@angular/forms";
import {SpinnerComponent} from './components/spinner/spinner.component';
import {MultiboxComponent} from './components/multibox/multibox.component';

@NgModule({
  declarations: [
    AppComponent,
    MainListComponent,
    DetailedPageComponent,
    PaginationComponent,
    CompanyCardComponent,
    SpinnerComponent,
    MultiboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
