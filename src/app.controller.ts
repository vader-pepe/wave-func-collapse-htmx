import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { random } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return { script: this.appService.getHello() }
  }

  @Post('draw-grid')
  drawGrids(@Body() dimension: { height: number; width: number }): string {
    const GRID_HEIGHT = dimension.height;
    const GRID_WIDTH = dimension.width;
    const cell_size = 32;
    const total_cell = GRID_WIDTH / cell_size * GRID_HEIGHT / cell_size;
    const BLANK = 0;
    const UP = 1;
    const RIGHT = 2;
    const DOWN = 3;
    const LEFT = 4;
    const sprites = ['blank', 'up', 'right', 'down', 'left'];
    const grid: Array<{ collapsed: boolean; options: Array<0 | 1 | 2 | 3 | 4>; }> = []

    for (let i = 0; i < total_cell; i++) {
      grid.push({
        options: [BLANK, UP, RIGHT, DOWN, LEFT],
        collapsed: false,
      })
    }

    grid[0].options = [UP, DOWN];
    grid[2].options = [UP, DOWN];

    // PICK CELL WITH LEAST ENTROPY
    // AKA LEAST OPTIONS
    const gridCopy = [...grid];
    gridCopy.sort((a, b) => {
      return a.options.length - b.options.length
    })

    const len = gridCopy[0].options.length;
    let stopIndex = 0;
    for (let i = 0; i < gridCopy.length; i++) {
      if (gridCopy[i].options.length > len) {
        stopIndex = i;
        break;
      }
    }

    gridCopy.splice(stopIndex);
    const cell = random(gridCopy)
    cell.collapsed = true;
    const pick = random(cell.options);
    cell.options = [pick];

    // DRAWING FUNCTION
    let cellToDraw = ''
    for (let i = 0; i < total_cell; i++) {
      if (grid[i].collapsed) {
        if (grid[i].options.length === 1) {
          const sprite_index = grid[i].options[0];
          cellToDraw += `<img class="w-[${cell_size}px] h-[${cell_size}px] border border-white" src="./sprites/${sprites[sprite_index]}.png" alt="">`
        }
      } else {
        cellToDraw += `<div class="border border-white bg-black w-[${cell_size}px] h-[${cell_size}px]"></div>`
      }
    }
    return cellToDraw;
  }
}
