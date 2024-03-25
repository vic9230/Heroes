import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesEditComponent} from './heroes-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";

describe('HeroesEditComponent', () => {
  let component: HeroesEditComponent;
  let fixture: ComponentFixture<HeroesEditComponent>;

  beforeEach(() => {
    // Mock del MatDialog
    const matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true) // Simula el método afterClosed de MatDialog
      })
    };
    // Mock de la ruta
    const activatedRouteMock = {
      params: of({'id': '1'}) // Simula el objeto params
    };

    TestBed.configureTestingModule({
      imports: [HeroesEditComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'some-value'  // Puedes ajustar esto según tus necesidades
              }
            }
          }
        },
        {provide: MatDialog, useValue: matDialogMock},
      {provide: ActivatedRoute, useValue: activatedRouteMock},
      ]
    });
    fixture = TestBed.createComponent(HeroesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
