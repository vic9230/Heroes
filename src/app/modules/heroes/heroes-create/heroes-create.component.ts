import {Component} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {HeroesFormComponent} from "../heroes-form/heroes-form.component";
import {GoBackButtonComponent} from "../../../utils/components/go-back-button/go-back-button.component";
import {UpperCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-heroes-create',
    templateUrl: './heroes-create.component.html',
    standalone: true,
    styleUrls: ['./heroes-create.component.scss'],
  imports: [
    HeroesFormComponent,
    FlexModule,
    GoBackButtonComponent,
    UpperCasePipe,
    RouterLink
  ]
})
export class HeroesCreateComponent {

}
