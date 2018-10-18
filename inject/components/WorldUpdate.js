import Component from './Component'

class WorldUpdate extends Component {

  constructor() {
    super();

    this.events = {
      "wld.upd": this.worldUpdate
    }
  }
  
  worldUpdate(event) {
    const tiles = event["cs"];
    if (tiles && tiles.length > 0) {
      console.log("Tiles incoming:", tiles);
    }
  }

}

export default WorldUpdate;