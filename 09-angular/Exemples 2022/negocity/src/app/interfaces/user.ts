import { Survivor } from './survivor';
export interface User {

    email: string;
    password: string;

}

export interface Player {
  id: string;
  nick: string;
  avatar: string;
  survivors: Survivor[];
}
