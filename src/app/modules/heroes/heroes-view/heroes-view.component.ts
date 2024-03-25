import {ChangeDetectorRef, Component} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AsyncPipe, NgFor, NgIf, NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { Heroe} from "../../../mock-api/defs/Heroes";
import {FormControl, FormGroup} from "@angular/forms";
import {GoBackButtonComponent} from "../../../utils/components/go-back-button/go-back-button.component";
import {HeroesListComponent} from "../heroes-list/heroes-list.component";
import {MatDialog} from "@angular/material/dialog";
import {HeroeService} from "../../../mock-api/services/Heroes";
import {FakeLoadingComponent} from "../../../utils/components/fake-loading/fake-loading.component";

@Component({
  selector: 'app-heroes-view',
  templateUrl: './heroes-view.component.html',
  standalone: true,
  styleUrls: ['./heroes-view.component.scss'],
  providers: [HeroeService],
  imports: [
    FlexModule,
    AsyncPipe,
    NgIf,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
    NgFor,
    MatDividerModule,
    MatTooltipModule,
    MatIconModule,
    NgOptimizedImage,
    GoBackButtonComponent,
    UpperCasePipe,
    FakeLoadingComponent,
  ]
})
export class HeroesViewComponent extends HeroesListComponent {
  displayedColumns: string[] = ['campo', 'valor'];
  displayedAttributes: string[] = [
    'gender'
  ];
  attributeTranslations: { [key: string]: string } = {
    gender: 'Género',
  };
  heroViewFG = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    image_url: new FormControl(''),
  });
  heroe$!: Observable<Heroe | null>;

  genderEnum = [
    {id: 'M', name: 'Masculino'},
    {id: 'F', name: 'Femenino'},
    {id: 'O', name: 'Otro'}
  ];
  completeGenderDict: any = {};

  constructor(
    protected _heroeService: HeroeService,
    protected route: ActivatedRoute,
    _changeDetector: ChangeDetectorRef,
    dialog: MatDialog,
    snackBar: MatSnackBar,
    _router: Router,
  ) {
    super(_heroeService, _changeDetector, dialog, snackBar, _router);
    this.route.params
      .subscribe(params => {
        this.heroViewFG.patchValue({
          id: params['id']
        });
        this.getHeroe(params['id']);
      });
    this.genderEnum.forEach(value => {
      this.completeGenderDict[value.id] = value.name;
    });
  }

  public getHeroe(heroeId: string): void {
    this.heroe$ = this._heroeService
      .read({id: parseInt(heroeId)})
      .pipe(
        map((heroe: Heroe) => {
          return heroe;
        }),
        catchError(() => {
          return of(null);
        })
      );

  }

}

