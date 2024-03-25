import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {Heroe} from "../../../mock-api/defs/Heroes";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {NgIf, NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {CapitalizePipe} from "../../../utils/capitalize.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HeroeService} from "../../../mock-api/services/Heroes";
import {FakeLoadingComponent} from "../../../utils/components/fake-loading/fake-loading.component";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  standalone: true,
  imports: [
    MatIconModule,
    FlexModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
    CapitalizePipe,
    UpperCasePipe,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    FakeLoadingComponent,
    MatSelectModule,
  ],
  providers: [
    MatSnackBar,
    HeroeService
  ],
  styleUrls: ['./heroes-form.component.scss']
})
export class HeroesFormComponent implements OnInit, OnDestroy {
  submitBtnText!: string;
  isEdit!: boolean;

  @Input()
  heroe!: Heroe;

  file_image!: { name: string; file: File; url?: string };
  isLoading: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  heroFormFG = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    image_url: new FormControl(''),
    description: new FormControl(''),
    gender: new FormControl(''),
  });

  constructor(
    private _router: Router,
    public heroService: HeroeService,
    public _matSnackBar: MatSnackBar
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.isEdit = !!this.heroe;
    this.submitBtnText = this.isEdit ? 'Guardar' : 'Crear';

    // Edicion
    if (this.isEdit) {
      this.heroFormFG.reset({
        ...this.heroe
      });
    }
  }

  ngOnDestroy(): void {
    this.heroFormFG.reset();
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  submit(): void {
    this.isLoading = true;
    const service = !this.isEdit ? 'create' : 'partialUpdate';
    let params = {
      id: this.heroFormFG.value.id || 0,
      data: <Heroe>this.heroFormFG.value
    }
    this.heroService[service](params)
      .pipe()
      .subscribe(data => {
        setTimeout(() => {
          this.isLoading = false;
          const snackBarRef = this._matSnackBar.open('Heroe ' + (this.isEdit ? 'actualizado' : 'creado') + ' correctamente', 'Cerrar', {duration: 2000})
          snackBarRef.afterDismissed().subscribe(() => {
            this._router.navigateByUrl(`/heroes`);
          });
        }, 2000);
      })
  }


  // -----------------------------------------------------------------------------------------------------
  // @ FILES
  // -----------------------------------------------------------------------------------------------------
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validImageExtensions = ['jpg', 'png', 'jpeg', 'gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (validImageExtensions.includes(fileExtension)) {
        this.file_image = {name: file.name, file: file, url: URL.createObjectURL(file)};
        this.heroFormFG.get('image_url')?.setValue(this.file_image.url || '');
      } else {
        this._matSnackBar.open('Formato de archivo no válido', 'Cerrar', {duration: 3000});
      }
    }
  }

}
