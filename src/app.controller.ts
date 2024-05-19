import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { random } from './utils';
import { CreateGridDto, Grid, Sprite } from './gridDto/createGridDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return { script: this.appService.getHello() }
  }

  @Post('draw-grid')
  drawGrids(@Body() dto: CreateGridDto): string {
    // STEPS
    // 1. PICK ANY CELL THAT HASN'T BEEN COLLAPSED
    //    WITH LEAST ENTROPY(OPTIONS)
    // 2. COLLAPSE IT
    // 3. EVALUATE & UPDATE THE ENTROPY (CHECK UP, RIGHT, DOWN, LEFT)
    const GRID_HEIGHT = dto.height;
    const GRID_WIDTH = dto.width;
    const cell_size = dto.cell_size;
    const ROW = dto.width / cell_size;
    const COLUMN = dto.height / cell_size;
    const total_cell = (GRID_WIDTH / cell_size) * (GRID_HEIGHT / cell_size);
    const BLANK = 0;
    const UP = 1;
    const RIGHT = 2;
    const DOWN = 3;
    const LEFT = 4;
    const sprites: Array<Sprite> = [
      Sprite.BLANK,
      Sprite.UP,
      Sprite.RIGHT,
      Sprite.DOWN,
      Sprite.LEFT
    ];

    let grid: Grid = []

    for (let i = 0; i < total_cell; i++) {
      grid.push({
        options: [BLANK, UP, RIGHT, DOWN, LEFT],
        collapsed: false,
      })
    }

    // SORT GRID FROM THE LEAST ENTROPY
    // BY COPYING THE ORIGINAL GRID
    let gridCopy = [...grid];
    gridCopy = gridCopy.filter((value) => !value.collapsed);
    gridCopy.sort((a, b) => {
      return a.options.length - b.options.length
    })

    // REMOVES ALL CELLS EXCEPT THE LEAST ONE
    const len = gridCopy[0].options.length;
    let stopIndex = 0;
    for (let i = 0; i < total_cell; i++) {
      if (gridCopy[i].options.length > len) {
        stopIndex = i;
        break;
      }
    }
    //

    if (stopIndex > 0) gridCopy.splice(stopIndex);
    const cell = random(gridCopy)
    cell.collapsed = true;
    const pick = random(cell.options);
    cell.options = [pick];

    const nextGrid: Grid = [...grid];
    for (let i = 0; i < total_cell; i++) {
      if (grid[i].collapsed) {
        nextGrid[i] = grid[i]
      } else {
        // LOOK UP
        if (i > 0 && i >= ROW) {
          // ONLY LOOK UP WHEN SOMETHING ABOVE
          // console.log("UP", i)
        }

        // LOOK LEFT
        if (i % ROW !== 0) {
          // console.log("LEFT", i)
        }

        // LOOK DOWN
        if (i <= (total_cell - 1) - ROW) {
          // console.log("DOWN", i)
        }

        // LOOK RIGHT
        if (i > 0 && (i + 1) % (ROW) !== 0) {
          // console.log("RIGHT", i)
        }
      }
    }

    grid = nextGrid;

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
