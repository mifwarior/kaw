import EventBus from './EventBus'

class Composite extends EventBus {

  constructor() {
    this.children = [];
    this.parent = null;
  }

  addComponent(component) {
    this.children.push(component);
    component.parent = this;
    this.subscribe(component);
    return this;
  }

  getComponentByType(type) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i] instanceof type) {
        return this.children[i];
      }
    }
    return null;
  }

  removeComponent(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
    this.unsubscribe(component);
    return this;
  }
}

export default Composite;