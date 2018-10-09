class Core {

  constructor() {
    this.modules = {};
    this.inject = this.inject.bind(this);
  }
  StartInject() {
    var intervalId = setInterval(function () {
      if (window["Module"]) {
        clearInterval(intervalId);
        this.inject();
      }
    }, 100);
  };


  inject() {
    if (window["FileReader"].injected) {
      console.log("Already injected");
    } else {

      var originFileReader = window["FileReader"];
      var self = this;

      function WrappedFileReader() {
        var reader = new originFileReader();
        reader.addEventListener("load", self.parseCommand(reader.result));
        return reader;
      }

      WrappedFileReader.injected = true;
      window["FileReader"] = WrappedFileReader;
      console.log("Injected success");
    }
  }

  parseCommand(event) {
    var array = new Uint8Array(event.target.result);
    if (array[0] !== 6) return;

    var compressed = ((array[1] & 1) != 0);

    try {

      if (compressed) {

        var compressedArray = array.slice(12);
        var decompressed = new Zlib.Inflate(compressedArray).decompress();
        var json = UTF8ArrayToString(decompressed, 0);
        var data = JSON.parse(json);
        this.processCommand(data, compressed);
      } else {
        var json = UTF8ArrayToString(array, 8);
        var data = JSON.parse(json);
        this.processCommand(data, compressed);
      }
    } catch (e) {
      console.error(e);
    }
  }

  subscribe(eventName, module) {
    if(this.modules[eventName]) {
      this.modules[eventName] = [];
    }
    var arr = this.modules[eventName];
  }

  processCommand(data, compressed) {
    for (var i = 0; data.length && i < data.length; i++) {
      this.modules[data["e"]]
    }
  }
}
