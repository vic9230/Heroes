import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesViewComponent} from './heroes-view.component';
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

describe('HeroesViewComponent', () => {
  let component: HeroesViewComponent;
  let fixture: ComponentFixture<HeroesViewComponent>;

  beforeEach(() => {
    // Mock de la ruta
    const activatedRouteMock = {
      params: of({'id': '1'}) // Simula el objeto params
    };

    // Mock del MatDialog
    const matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true) // Simula el método afterClosed de MatDialog
      })
    };
    TestBed.configureTestingModule({
      imports: [HeroesViewComponent, HttpClientModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: MatDialog, useValue: matDialogMock}

      ]
    });
    fixture = TestBed.createComponent(HeroesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
