import Composite from './components/Composite'
import EventDispatch from './components/EventDispatch'

import WorldUpdate from './components/WorldUpdate'
import ZlibHolder from './utils/zlib'
import {UTF8ArrayToString} from './utils/UTF8Encoding'

var Zlib = ZlibHolder["Zlib"];
var composite = new Composite();
var eventDispatch = new EventDispatch();

composite.addComponent(eventDispatch);
composite.addComponent(new WorldUpdate());

function Init() {

  function parseCommand(event) {
    var array = new Uint8Array(event.target.result);
    if (array[0] !== 6) return;

    var compressed = ((array[1] & 1) != 0);
    
    try {
      if (compressed) {
        var compressedArray = array.slice(12);
        
        var decompressed = new Zlib.Inflate(compressedArray).decompress();
        var json = UTF8ArrayToString(decompressed, 0);
        eventDispatch.parse(json, compressed);

      } else {
        var json = UTF8ArrayToString(array, 8);
        eventDispatch.parse(json, compressed);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function inject() {
    if (window["FileReader"].injected) {
      console.log("Already injected");
    } else {

      var originFileReader = window["FileReader"];

      function WrappedFileReader() {
        var reader = new originFileReader();
        reader.addEventListener("load", parseCommand);
        return reader;
      }

      WrappedFileReader.injected = true;
      window["FileReader"] = WrappedFileReader;
      console.log("Injected success");
    }
  }

  var intervalId = setInterval(function () {
    console.log("Try Inject");
    if (window["Module"]) {
      clearInterval(intervalId);
      inject();
    }
  }, 100);
}

Init();