import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

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
      imports: [HeroesListComponent, HttpClientModule],
      providers: [
        {provide: MatDialog, useValue: matDialogMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},

      ]
    });
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
