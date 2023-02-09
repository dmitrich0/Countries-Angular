import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainListComponent} from "./components/main-list/main-list.component";
import {DetailedPageComponent} from "./components/detailed-page/detailed-page.component";

const routes: Routes = [
  {
    path: '',
    component: MainListComponent
  },
  {
    path: 'country/:code',
    component: DetailedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
