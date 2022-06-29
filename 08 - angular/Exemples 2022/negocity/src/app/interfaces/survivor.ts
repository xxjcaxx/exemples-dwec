import { City } from './city';
import { User } from './user';
export interface Survivor {
  id: string;
  name: string;
  health: number;
  damage: number;
  shield: number;
  player?: string;
  city: string;
  image?: string;

}
