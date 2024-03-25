import {ChangeDetectorRef, Component} from "@angular/core";
import {HeroesViewComponent} from "../heroes-view/heroes-view.component";
import {FlexModule} from "@angular/flex-layout";
import {HeroesFormComponent} from "../heroes-form/heroes-form.component";
import {GoBackButtonComponent} from "../../../utils/components/go-back-button/go-back-button.component";
import {AsyncPipe, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HeroeService} from "../../../mock-api/services/Heroes";
import {FakeLoadingComponent} from "../../../utils/components/fake-loading/fake-loading.component";

@Component({
  selector: 'app-heroes-edit',
  templateUrl: './heroes-edit.component.html',
  standalone: true,
  imports: [
    FlexModule,
    HeroesFormComponent,
    GoBackButtonComponent,
    AsyncPipe,
    NgIf,
    UpperCasePipe,
    FakeLoadingComponent,
    RouterLink
  ],
  providers: [
    HeroeService,
    MatSnackBar
  ],
  styleUrls: ['./heroes-edit.component.scss']
})
export class HeroesEditComponent extends HeroesViewComponent {

  constructor(
    heroeService: HeroeService,
    route: ActivatedRoute,
    changeDetector: ChangeDetectorRef,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    router: Router,
  ) {
    super(heroeService, route, changeDetector, dialog, snackBar, router);
  }
}
