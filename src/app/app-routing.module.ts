import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

export const routes: Route[] = [

  {path: '', pathMatch: 'full', redirectTo: 'heroes'},
  {
    path: '',
    children: [
      {
        path: 'heroes',
        loadChildren: () => import('src/app/modules/heroes/heroes.routes'),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
