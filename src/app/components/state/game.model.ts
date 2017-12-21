import { Field } from '../tetris/tetris.component'

export interface Game {
    id: string;
    done: boolean;
    field: Field;
    score: number;
    level: number;
    pause: boolean;
  }