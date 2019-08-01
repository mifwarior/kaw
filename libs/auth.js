function Inject() {
  var injected = false;
  var tmp = null;
  var intervalInject = setInterval(function () {
    if (!injected && window["Module"] && window["Module"].asmLibraryArg && window["Module"].asmLibraryArg._SocketSend) {
      console.log("INJECT SUCCESS", "color:green;");
      injected = true;
      clearInterval(intervalInject);
      tmp = window["Module"].asmLibraryArg._SocketSend;
      window["Module"].asmLibraryArg._SocketSend = function (socketInstance, array, length) {
        console.log(window["Module"].HEAPU8.buffer.slice(array, array + length));
        tmp(socketInstance, array, length);
      };

    }
  }, 100);
}

Inject()