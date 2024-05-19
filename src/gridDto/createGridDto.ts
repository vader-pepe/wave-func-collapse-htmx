export class Cell {
  collapsed: boolean;
  options: Array<0 | 1 | 2 | 3 | 4>;
}

export type Grid = Array<Cell>

export enum Sprite {
  BLANK = 'blank',
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
}

export class CreateGridDto {
  height: number;
  width: number;
  cell_size: number;
}
