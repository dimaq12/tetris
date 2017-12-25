import { Field } from '../classes/field';

export interface Game {
  id: string;
  started: boolean;
  field: Field;
  score: number;
  level: number;
  pause: boolean;
}