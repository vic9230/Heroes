import {Injectable} from '@angular/core';
import {heroes as heroesData} from "./data";
import {Heroe} from "../defs/Heroes";
import {MockApiService} from "../mock-api.service";
import {assign, cloneDeep, parseInt} from "lodash-es";

@Injectable({providedIn: 'root'})
export class HeroesMockApi {
  private _heroes: Heroe[] = heroesData;

  constructor(private _mockApiService: MockApiService) {
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  registerHandlers(): void {

    // -----------------------------------------------------------------------------------------------------
    // @ Heroes List  - GET
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet('api/heroes', 2000)
      .reply(({request}): [number, Heroe[]] => {
        const query: string = request.params.get('search') || '';
        let heroes: Heroe[] = [...this._heroes];
        if (query) {
          heroes = heroes.filter((heroe: Heroe) =>
            heroe.name && heroe.name.toLowerCase().includes(query.toLowerCase())
          );
        }
        heroes.sort((a: Heroe, b: Heroe) => a.name.localeCompare(b.name));

        return [200, heroes];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Heroes - GET
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet('api/heroe/:id',2000)
      .reply(({request}) => {
        let split = request.url.split('/');
        const id: number = parseInt(split[split.length - 1] || '') || 0;
        let heroes: Heroe[] = [...this._heroes];
        const heroe = heroes.find((item: Heroe) => item.id === id);

        return [200, heroe];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Heroes - POST
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onPost('api/heroe')
      .reply(({request}) => {
        const size: number = this._heroes.length - 1;
        const lastId: number = this._heroes[size]?.id || 0;
        const newHeroe: Heroe = {
          id: lastId + 1,
          image_url: request.body.image_url ? request.body.image_url : 'https://cdn-icons-png.flaticon.com/512/6520/6520763.png',
          name: request.body.name,
        };
        this._heroes.unshift(newHeroe);

        return [200, newHeroe];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Heroes - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onPatch('api/heroe/:id')
      .reply(({request}) => {
        const id = request.body.id;
        const heroe = cloneDeep({...request.body});

        let updatedHeroe = null;

        this._heroes.forEach((item: Heroe, index: number, heroes: Heroe[]) => {
          if (item.id === id) {
            heroes[index] = assign({}, heroes[index], heroe);
            updatedHeroe = heroes[index];
          }
        });

        return [200, updatedHeroe];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Heroes - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onDelete('api/heroe/:id')
      .reply(({request}) => {
        let split = request.url.split('/');
        const id: number = parseInt(split[split.length - 1] || '') || 0;
        this._heroes.forEach((item, index) => {
          if (item.id === id) {
            this._heroes.splice(index, 1);
          }
        });

        return [200, 'true'];
      });
  }
}
