import Component from './Component'

class WorldUpdate extends Component {

  constructor() {
    super();

    this.events = {
      "wld.upd": this.worldUpdate.bind(this)
    }
    this.alnFilter = 0;
    this.filterStorage = {};


    window["AlnFilter"] = function (id) {
      this.alnFilter = id;
    }.bind(this);

    window["ShowFilter"] = function () {
      return this.filterStorage;
    }.bind(this);

    window["ClearFilter"] = function () {
      this.filterStorage = {};
    }.bind(this);

    window["FindByElapsedTime"] = function (p) {
      var d = p.d || 0, h = p.h || 0, m = p.m || 0;
      var time = ((d * 24 + h) * 60 + m) * 60;
      var keys = Object.keys(this.filterStorage);
      for (var i = 0; i < keys.length; i++) {
        var town = this.filterStorage[keys[i]];
        if (town.elapsedTime && town.elapsedTime <= time) {
          this.printTown(town);
        }
      }
    }.bind(this);
  }

  printTown(town) {
    console.log("Упадет через: %c" + town.elapsed + " Координаты: %c" + town.x + ":" + town.y + " Орден: " + town.aln + " Имя: " + town.name, "color:red;", "color:blue;");
  }

  worldUpdate(event) {
    const tiles = event["cs"];
    if (tiles && tiles.length > 0) {
      for (var i = 0; i < tiles.length; i++) {
        //console.log("Tiles incoming:", tiles[i]);
        this.unshieldedTowns(tiles[i]);
      }
    }
  }

  unshieldedTowns(tile) {
    if (tile.cid === 1 && tile.usr && tile.usr.aln
      && (!this.alnFilter || this.alnFilter === tile.usr.aln.aid)) {

      var unshielded = (tile.bst === undefined);

      var town = {
        elapsed: "",
        shiledDrop: "",
        unshielded: unshielded,
        aln: tile.usr.aln.t,
        alnId: tile.usr.aln.aid,
        x: tile.lx,
        y: tile.ly,
        id: tile.usr.uid
      };

      if (tile.usr && tile.usr.fn) {
        town.name = tile.usr.fn;
      }

      if (!unshielded && tile.bst[0] && tile.bst[0].bid === 6) {
        var shiled = tile.bst[0];
        if (shiled.t < 0) {
          town.unshielded = true;
        } else {
          town.shiledDrop = new Date(shiled.t * 1000).toLocaleString();

          var elapsed = new Date(shiled.t * 1000 - Date.now()) / 1000;
          town.elapsedTime = elapsed;
          town.elapsed = ((elapsed / 3600) | 0) + " h " + (((elapsed % 3600) / 60) | 0) + " m";
        }
      }
      if (this.alnFilter) {
        this.appendUniq(town);
      } else {
        console.log(town);
      }
    }
  }

  appendUniq(town) {
    if (!this.filterStorage[town.id]) {
      this.filterStorage[town.id] = town
    };
  }



}

export default WorldUpdate;