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
/// SOMETHING BIG:
/// [6, 1, 1, 1, 0, 0, 1, 142, 0, 0, 4, 203, 120, 156, 141, 148, 203, 110, 131, 64, 12, 69
	
/// WORLD UPDATE:
/// [6, 1, 1, 1, 0, 1, 16, 79, 0, 9, 254, 64, 120, 156, 236, 189, 11, 147, 220, 214, 117, 46, 250, 87, 32, 86, 29, 235, 158, 123, 103, 154, 216, 79, 0, 204, 245, 205, 165, 36, 234...]	
/// byte header = 6, 
/// byte options, 
/// byte sender,  
/// byte receiver,
/// int sizeData ( littleEndian? from back: from next 4 bytes )
/// byte[] data from 8 - end ( compressed = (options & 1) != 0 )
/// 
/*
Uncompression:
          from 4 byte;
          data to uncompress: from 12 to (len - 12);
          uncompress type : zlib 
		  
		  compressionAndDecompressionTest(testData, Zlib.Deflate.CompressionType.NONE);
		  compressionAndDecompressionTest(testData, Zlib.Deflate.CompressionType.FIXED);
		  compressionAndDecompressionTest(testData, Zlib.Deflate.CompressionType.DYNAMIC);
		  
		  var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
		  var compressed = new Zlib.Deflate(data).compress();
		  var decompressed = new Zlib.Inflate(compressed).decompress();

*/
/*
unshielded = {
	cid: 1,
	did: 0,
dt: -62135596800,
ft: 1538858248,
kid: 54,
lid: 3,
ln: "city_3844053",
lx: 284,
ly: 496,
sid: 0,
st: -62135596800,
	usr: null
}

enemyTiles = {
	lv: null,
	kid: null,
	usr:{
		aln: {aid:48985}
	}
};
*/