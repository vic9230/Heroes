import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeroesFormComponent} from './heroes-form.component';
import {HeroeService} from '../../../mock-api/services/Heroes';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('HeroesFormComponent', () => {
  let component: HeroesFormComponent;
  let fixture: ComponentFixture<HeroesFormComponent>;
  let mockHeroeService: jasmine.SpyObj<HeroeService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockHeroeService = jasmine.createSpyObj('HeroeService', ['create']);

    TestBed.configureTestingModule({
      imports: [
        HeroesFormComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientTestingModule],
      providers: [
        {provide: HeroeService, useValue: mockHeroeService}
      ]
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes para evitar errores en otras pruebas
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a Heroe', () => {
    const heroe = {id: 0, name: 'Superman', image_url: 'superman.jpg'};

    component.heroFormFG.patchValue({
      image_url: heroe.image_url
    });

    component.submit();

    const req = httpTestingController.expectOne('api/heroe');
    expect(req.request.method).toEqual('POST');
    req.flush(heroe);
  });
});
