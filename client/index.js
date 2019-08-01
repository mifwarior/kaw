function Observable(context) {

  const subscribers = [];

  this.subscribe = (sub) => {

  };

  this.notify = (event) => {
    for (var i = 0; i < subscribers.length; i++) {
      subscribers(event, context)
    }
  };
}

// --- network layer
// dummy
const socket = { addEventListener: () => { } }

const serializer = new Observable()
serializer.subscribe(function fromJson(bytes, context){

})
serializer.subscribe(function fromZippedJson(bytes, context){
  
})



socket.addEventListener("message", observable.notify)

// --- game layer
const context = {};
const observable = new Observable(context)

observable.subscribe(function worldUpdate(event, context) {
  console.log("worldUpdate", event);
});

observable.subscribe(function marchUpdate(event, context) {
  console.log("marchUpdate", event);
});






