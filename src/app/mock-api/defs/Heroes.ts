export interface Heroe {
  id?: number;
  image_url?: string;
  name: string;
  description?: string;
  gender?: GenderEnum;
}


export type GenderEnum = 'M' | 'F' | 'O';
