import Component from './Component'

class EventDispatch extends Component{

  constructor(){
    super()
    this.jsonLog = false;

    window["JsonLog"] = function(active) {
      this.jsonLog = active;
    }.bind(this);
  }

  parse(json) {
    var events = JSON.parse(json);
    if(this.jsonLog) {
      console.log(events)
    }
    for(var i = 0; i < events.length; i++) {
      var event = events[i];
      var type = event["e"];
      if(type) {
        this.emitEvent(type, event);
      }
    }
  }
}

export default EventDispatch;