class Unit {
  constructor(map, tile, type) {
    // this.player = player;
    this.map = map;
    this.hasFocus = false;
    this.type = type;
    this.info = unitTypes[type]
    this.tile = tile;
    this.mapX = this.tile.mapX;
    this.mapY = this.tile.mapY;
    print(this.mapX);
    print(this.mapY);

    this.tile.setUnit(this);
    // player.units.push(this);
  }

  show() {
    if (this.hasFocus) {
      fill(0);
      this.showMovement();
    } else {
      fill(255);
    }
    this.info.show(this.tile.SIZE / 4);
  }

  attack(unit) {

  }

  showInfo() {

  }

  move(tile) {
    this.tile.unit = null
    this.tile = tile;
    tile.unit = this;
    this.mapX = this.tile.mapX;
    this.mapY = this.tile.mapY;
    this.hasFocus = false;
  }

  showMovement() {
    if (this.hasFocus) {
      for (let i = -this.info.movement; i <= this.info.movement; i++) {
        for (let j = -this.info.movement; j <= this.info.movement; j++) {
          if (!(i == 0 && j == 0)) {
            try {
              let tile = this.map.tiles[this.mapY-j][this.mapX-i];
              this.map.tiles[this.mapY-j][this.mapX-i].highlight();
              if (tile.hit() && (MousePressed && !pMousePressed)) {
                console.log("CLICKED!")
                this.move(tile);
              }
            } catch(err) {
              // DO NOTHING
            }
          }
        }
      }
    }
  }

  setFocus(bool) {
    this.hasFocus = bool;
  }

  resetPos(map, tile) {

  }

}

let unitTypes = {
  "warrior": {
    attack: 2,
    defense: 2,
    health: 10,
    movement: 1,
    abilities: ['none'],
    show(wh) {
      rect(0, 0, wh, wh, 5);
    },
  },
  "horseman": {
    attack: 2,
    defense: 1,
    health: 10,
    movement: 2,
    abilities: ['none', 'none2', '\nnone'],
    show(wh) {
      ellipse(0, 0, wh, wh);
    }
  },
  "potato": {
    attack:999,
    defense:999,
    health:999,
    movement:10,
    abilities: ['potato'],
    show(wh) {
      polygon(0,0,wh/2,3);
      fill(255,0,0);
      ellipse(0,0, wh - 10, wh - 10);
    }
  }
}
