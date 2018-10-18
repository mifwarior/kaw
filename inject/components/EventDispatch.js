import Component from './Component'

class EventDispatch extends Component{

  parse(json) {
    var events = JSON.parse(json);
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