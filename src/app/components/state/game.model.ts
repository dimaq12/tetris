import { Field } from '../classes/field';

export interface Game {
    id: string;
    done: boolean;
    field: Field;
    score: number;
    level: number;
    pause: boolean;
  }