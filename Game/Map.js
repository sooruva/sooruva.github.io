class Map {
  constructor(SIZE, TILE_SIZE) {
    this.reset(SIZE, TILE_SIZE);
  }

  show() {
    if (this.showTiles) {
      // for (let i = 0; i < this.SIZE; i++) {
      //   for (let j = 0; j < this.SIZE; j++) {
      //     this.tiles[i][j].show(j * this.TILE_SIZE + this.offset.x, i * this.TILE_SIZE + this.offset.y);
      //     // this.tiles[i][j].show(this.offset.x, this.offset.y);
      //
      //     // let f = max(0, noise(0.1 * i, 0.1 * j) - 0.5);
      //     // let c = this.tiles[i][j].col;
      //     // fill(c);
      //     // noStroke();
      //     // this.tiles[i][j].show(i * this.TILE_SIZE + this.offset.x + this.initOffset.x, j * this.TILE_SIZE - 200 * f + this.offset.y + this.initOffset.y, this.TILE_SIZE);
      //     // fill(red(c) / 2, green(c) / 2, blue(c) / 2);
      //     // rect(i * this.TILE_SIZE, (j + 1) * this.TILE_SIZE - 200 * f, this.TILE_SIZE, this.TILE_SIZE + 200 * f);
      //   }
      // }
      for (let arr of this.tiles) {
        for (let tile of arr) {
          tile.update(tile.mapX * tile.SIZE + this.offset.x, tile.mapY * tile.SIZE + this.offset.y)
          tile.show();
        }
      }
    }
    // Show all Points in the canvas
    if (this.showPoints) {
      // for (let i = 0; i <= this.SIZE; i++) {
      //   for (let j = 0; j <= this.SIZE; j++) {
      //     this.points[i][j].show((j - 0.5) * this.TILE_SIZE + this.offset.x, (i - 0.5) * this.TILE_SIZE + this.offset.y);
      //   }
      // }
      for (let arr of this.points) {
        for (let point of arr) {
          point.show((point.mapX - 0.5) * this.TILE_SIZE + this.offset.x, (point.mapY - 0.5) * this.TILE_SIZE + this.offset.y)
        }
      }
    }
  }

  update() {
    if (this.selectedTile) this.selectedTIle.highlight("focus");
  }

  generate() {

  }

  pan() {
    this.offset.x = mouseX - this.mouse.x + this.pOffset.x
    //this.offset.x = constrain(this.offset.x, - width / 2, width / 2);
    this.offset.y = mouseY - this.mouse.y + this.pOffset.y
    //this.offset.y = constrain(this.offset.y, -height / 2, height / 2);
  }

  reset(SIZE, TILE_SIZE) {
    this.SIZE = SIZE;
    this.TILE_SIZE = TILE_SIZE;
    // Array of tiles that makes up the map
    this.tiles = make2DArray(this.SIZE);
    // Array of points that are placed at the corner of each Tile
    this.points = make2DArray(this.SIZE + 1);
    // FOR PANNING THROUGH THE MAP:
    // Current offset
    // this.offset = createVector((width - this.SIZE * this.TILE_SIZE) / 2, (height - this.SIZE * this.TILE_SIZE) / 2);
    this.offset = createVector(0 + TILE_SIZE / 2, 0 + TILE_SIZE / 2);

    // Previous offset
    this.pOffset = createVector(0, 0);

    this.initOffset = createVector(0, 0);
    this.initOffset.set(this.offset);

    // vector to store mouse position for panning
    this.mouse = createVector(mouseX, mouseY);

    // Whether or not to show the Tiles/Point
    this.showTiles = true;
    this.showPoints = true;

    this.selectedTile = null;
    this.selectedUnit = null;

    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        this.tiles[i][j] = new Tile(this, j, i);
        // this.tiles[i][j].col = color(126);
        this.tiles[i][j].col = color(127 / this.SIZE * j + 128, 127 / this.SIZE * j + 128, 127 / this.SIZE * i + 128);

        // KINDA TERRAIN
        // let temp = 255*noise(0.1*i, 0.1*j);
        // if (temp > 150) {
        //   this.tiles[i][j].col = color(0,255,0);
        // } else if (temp > 100) {
        //   this.tiles[i][j].col = color(255,255,0);
        // } else {
        //   this.tiles[i][j].col = color(0,127, 127);
        // }

        // 3D-ish Terrain
        // let f = max(0, noise(0.1 * i, 0.1 * j) - 0.5);
        // this.tiles[i][j].show(i * this.TILE_SIZE, j * this.TILE_SIZE, this.TILE_SIZE);

      }
    }
    for (let i = 0; i <= this.SIZE; i++) {
      for (let j = 0; j <= this.SIZE; j++) {
        this.points[i][j] = new Point(this.TILE_SIZE / 4, this, j, i);
      }
    }

  }

  togglePoints(bool) {
    // Legacy Code
    // if (typeof bool === "boolean") return this.showPoints = bool;
    // return this.showPoints = !this.showPoints;
    this.showPoints = (typeof bool === "boolean") ? bool : !this.showPoints;
  }

  toggleTiles(bool) {
    // Legacy Code
    // if (typeof bool === "boolean") return this.showTiles = bool;
    // return this.showTiles = !this.showTiles;
    this.showTiles = (typeof bool === "boolean") ? bool : !this.showTiles;
  }

  centre(mx, my) {
    let x, y;
    x = width / 2 - this.TILE_SIZE * constrain(mx, 0, this.SIZE - 1);
    y = height / 2 - this.TILE_SIZE * constrain(my, 0, this.SIZE - 1);
    let tempPos = createVector(x, y);

    this.offset.set(tempPos);
  }

  showOffsets() {
    console.log("offset: " + this.offset);
  }

  checkFocus() {
    for (let arr of this.tiles) {
      for (let t of arr) {
        if (t.hit()) {
          this.selectedTile = t;
          if (t.unit) this.selectedUnit = t.unit;
        }
      }
    }
  }
}

/*
To cycle through each tile
for (let i = 0; i < this.rows; i++) {
  for (let j = 0; j < this.cols; j++) {

  }
}

Using Enhance For loop
for (let arr of this.tiles) {
  for (let t of arr) {

  }
}
*/
