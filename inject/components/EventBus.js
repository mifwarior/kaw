
class EventBus {

  constructor(){
    this.events = {};
  }

  subscribe(component) {
    const events = component.events;
    if(events){
      var keys = Object.keys(events);
      for(var i = 0; i < keys.length; i++) {
      
        const key = keys[i];
        if(typeof events[key] === "function"){
          
          if(!this.events[key]) {
            this.events[key] = []
          }

          this.events[keys].push({owner:component, func: events[key]});
        }
      }
    }
  }

  unsuscribe(component){

    var keys = Object.keys(this.events);
    for(var i = 0; i < keys.length; i++) {
      const list = this.events[keys[i]];
      this.events[keys[i]] = list.filter((subscriber)=>{
        return subscriber.owner !== component;
      })
    }

  }


  emitEvent(type, data) {
    var list = this.events[type];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        list[i].func(data);
      }
    }
  }
}

export default EventBus;