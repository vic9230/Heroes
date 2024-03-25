import {Routes} from '@angular/router';
import {HeroesListComponent} from "./heroes-list/heroes-list.component";
import {HeroesCreateComponent} from "./heroes-create/heroes-create.component";
import {HeroesEditComponent} from "./heroes-edit/heroes-edit.component";
import {HeroesViewComponent} from "./heroes-view/heroes-view.component";

export default [
    {
        path: '',
        component: HeroesListComponent,
    },
    {
        path: 'new',
        component: HeroesCreateComponent,
    },
    {
        path: ':id/edit',
        component: HeroesEditComponent
    },
    {
        path: ':id',
        component: HeroesViewComponent
    }
] as Routes;
