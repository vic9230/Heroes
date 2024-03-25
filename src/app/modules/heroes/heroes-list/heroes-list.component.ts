import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {fromEvent, merge, Observable, of, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, map, takeUntil, tap} from "rxjs/operators";
import {Heroe} from "../../../mock-api/defs/Heroes";
import {CapitalizePipe} from "../../../utils/capitalize.pipe";
import {DeleteDialogComponent} from "../../../utils/dialogs/delete/delete.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {HeroeService} from "../../../mock-api/services/Heroes";
import {FakeLoadingComponent} from "../../../utils/components/fake-loading/fake-loading.component";

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    CapitalizePipe,
    NgOptimizedImage,
    FakeLoadingComponent,
  ],
  providers: [
    HeroeService,
    MatSnackBar
  ],
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('quickSearchInput', {static: false}) quickSearchInput!: ElementRef;
  private unsubscribe$: Subject<void> = new Subject();
  public isChangedBlock: any = {};

  heroListFG = new FormGroup({
    search: new FormControl(''),
  });

  heroes$: Observable<Heroe[]> = of([]);

  constructor(
    public heroService: HeroeService,
    private _changeDetector: ChangeDetectorRef,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    protected _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngAfterViewInit(): void {
    if (this.quickSearchInput) {
      merge(
        fromEvent(this.quickSearchInput.nativeElement, 'keyup'),
        fromEvent(this.quickSearchInput.nativeElement, 'paste')
      ).pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.getHeroes())
      ).subscribe();
    }
    this._changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByItems(index: number, item: any): void {
    return item.id || 0;
  }

  clearSearch(): void {
    this.heroListFG.get('search')?.setValue('');
    this.getHeroes();
  }

  getHeroes(): void {
    const search = this.heroListFG.get('search')?.value || '';
    this.heroes$ = this.heroService.list({search}).pipe(
      catchError(() => of([]))
    );
  }

  deleteHeroe(heroe: Heroe): void {
    const dialogResult = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      data: {title: 'Eliminar heroe definitivamente.'}
    });

    dialogResult.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.delete({id: heroe.id || 0})
          .pipe(
            takeUntil(this.unsubscribe$),
            tap(() => {
              this.snackBar.open('El héroe se ha eliminado correctamente.', 'Aceptar')
              this._router.navigateByUrl(`/heroes`);
            }),
            catchError((error) => {
              this.snackBar.open('Se ha producido un error al eliminar el heroe.', 'Aceptar', {panelClass: 'error'});
              return of([]);
            }),
          ).subscribe(() => this.getHeroes());
      }
    });
  }
}
