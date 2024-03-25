import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesCreateComponent } from './heroes-create.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";

describe('HeroesCreateComponent', () => {
  let component: HeroesCreateComponent;
  let fixture: ComponentFixture<HeroesCreateComponent>;

  beforeEach(() => {
    const activatedRouteMock = {
      params: of({'id': '1'}) // Simula el objeto params
    };
    TestBed.configureTestingModule({
      imports: [HeroesCreateComponent, HttpClientModule, BrowserAnimationsModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
      ]
    });
    fixture = TestBed.createComponent(HeroesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
