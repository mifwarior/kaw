/*var originFunc = Module.asmLibraryArg._SocketRecv;
function injectedFunc(socketInstance, ptr, length){
        var socket = webSocketInstances[socketInstance];
        if (socket.messages.length == 0)
            return;
        if (socket.messages[0].length > length)
            return;
			console.log(socket.messages[0])
}
Module.asmLibraryArg._SocketRecv = function(socketInstance, ptr, length){
	injectedFunc(socketInstance, ptr, length);
	originFunc(socketInstance,ptr,length);
}


  function _SocketRecv(socketInstance, ptr, length) {
        var socket = webSocketInstances[socketInstance];
        if (socket.messages.length == 0)
            return;
        if (socket.messages[0].length > length)
            return;
        writeArrayToMemory(socket.messages[0], ptr);
        socket.messages = socket.messages.slice(1)
    }
	
	*/
	
	var originFileReader = FileReader;
	
	function WrappedFileReader(){
		var reader = new originFileReader();
		reader.addEventListener("loadend", (function() {
                    var array = new Uint8Array(reader.result);
                   console.log(array);
        }));
		return reader;
	}
	if(!FileReader.injected){
			WrappedFileReader.injected = true;
			window["FileReader"] = WrappedFileReader;

	} else {
		console.log("Already injected");
	}