use raylib::{ffi::Vector2, prelude::*};

const TILE_SIZE: i32 = 16;
const TILE_EDGES_COUNT: i32 = 16;
const SCREEN_WIDTH: i32 = 640;
const SCREEN_HEIGHT: i32 = 480;

fn main() {
    let (mut rl, thread) = raylib::init()
        .size(SCREEN_WIDTH, SCREEN_HEIGHT)
        .title("WFC 16 by 16 tiles")
        .build();

    let tile = &rl
        .load_texture(
            &thread,
            "./assets/img/Environment/Dungeon Prison/Assets/Tiles.png",
        )
        .expect("unable to load texture!");

    let tiles_arr = breakdown_tiles(&tile);

    let mut colors: Vec<Color> = vec![];

    {
        let tile_count = (tile.width() / TILE_SIZE) * (tile.height() / TILE_SIZE);
        let mut x = 0;
        let mut y = 0;
        for i in 0..tile_count {
            let mut x_in_tile = &x;
            let mut y_in_tile = &y;
            x += 16;
            if x >= SCREEN_WIDTH {
                x = 0;
                y += 16;
            }
            // COLORS FOR EACH PIXEL FOR 1 TILE
            for j in 0..(TILE_SIZE * TILE_SIZE) {
                // UP = 0-15. NEXT = 255-270. EVERY ITERATION ADD 255
                // LEFT = MULTIPLICATION OF 16. FROM 0-240.
                // RIGHT = MULTIPLICATION OF 16, MINUS 1
                // DOWN = 240-255
                //
                // TODO
                // CHECK UP LEFT (JUST SUBSTRACT BY 8 ELEMENTS)
                // CHECK UP RIGHT
                // CHECK DOWN LEFT
                // CHECK DOWN RIGHT
                // x += 1;
                // if x >= 16 {
                //     x = 0;
                //     y += 1;
                // }
            }
        }
    }

    // println!("{:#?}", colors);

    while !rl.window_should_close() {
        let mut d = rl.begin_drawing(&thread);

        d.clear_background(Color::WHITE);
        // TODO: start generating
        //
    }
}

fn breakdown_tiles(img: &Texture2D) -> Vec<Tile> {
    let tile_count = (img.width() / TILE_SIZE) * (img.height() / TILE_SIZE);
    let mut tiles_arr: Vec<Tile> = vec![];
    let mut x = 0;
    let mut y = 0;

    for _ in 0..tile_count {
        tiles_arr.push(Tile {
            rec: Rectangle {
                x: x as f32,
                y: y as f32,
                width: TILE_SIZE as f32,
                height: TILE_SIZE as f32,
            },
            edges: vec![],
            index: 0,
            up: vec![],
            right: vec![],
            down: vec![],
            left: vec![],
            colors_each_pixel: vec![],
        });
        x += TILE_SIZE;
        if x >= (img.width()) {
            x = 0;
            y += TILE_SIZE;
        }
    }
    tiles_arr
}

fn check_edges() {}

struct Tile {
    rec: Rectangle,
    edges: Vec<String>,
    index: i32,
    colors_each_pixel: Vec<Color>,
    up: Vec<String>,
    right: Vec<String>,
    down: Vec<String>,
    left: Vec<String>,
}
