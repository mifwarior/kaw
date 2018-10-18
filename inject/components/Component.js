class Component {

  constructor() {
    this.parent = null;
  }

  emitEvent(type, data) {
    this.parent.emitEvent(type, data);
  }

  getComponentByType(type) {
    return this.parent.getComponentByType(type);
  }

}

export default Component;