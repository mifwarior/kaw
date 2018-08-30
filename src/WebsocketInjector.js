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
        
function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
      return 0;
  
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
      var u = str.charCodeAt(i); // possibly a lead surrogate
      if (u >= 0xD800 && u <= 0xDFFF) {
        var u1 = str.charCodeAt(++i);
        u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
      }
      if (u <= 0x7F) {
        if (outIdx >= endIdx) break;
        outU8Array[outIdx++] = u;
      } else if (u <= 0x7FF) {
        if (outIdx + 1 >= endIdx) break;
        outU8Array[outIdx++] = 0xC0 | (u >> 6);
        outU8Array[outIdx++] = 0x80 | (u & 63);
      } else if (u <= 0xFFFF) {
        if (outIdx + 2 >= endIdx) break;
        outU8Array[outIdx++] = 0xE0 | (u >> 12);
        outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 0x80 | (u & 63);
      } else if (u <= 0x1FFFFF) {
        if (outIdx + 3 >= endIdx) break;
        outU8Array[outIdx++] = 0xF0 | (u >> 18);
        outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
        outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 0x80 | (u & 63);
      } else if (u <= 0x3FFFFFF) {
        if (outIdx + 4 >= endIdx) break;
        outU8Array[outIdx++] = 0xF8 | (u >> 24);
        outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
        outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
        outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 0x80 | (u & 63);
      } else {
        if (outIdx + 5 >= endIdx) break;
        outU8Array[outIdx++] = 0xFC | (u >> 30);
        outU8Array[outIdx++] = 0x80 | ((u >> 24) & 63);
        outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
        outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
        outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 0x80 | (u & 63);
      }
    }
    // Null-terminate the pointer to the buffer.
    outU8Array[outIdx] = 0;
    return outIdx - startIdx;
  }
  
         
  function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      var u = str.charCodeAt(i); // possibly a lead surrogate
      if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
      if (u <= 0x7F) {
        ++len;
      } else if (u <= 0x7FF) {
        len += 2;
      } else if (u <= 0xFFFF) {
        len += 3;
      } else if (u <= 0x1FFFFF) {
        len += 4;
      } else if (u <= 0x3FFFFFF) {
        len += 5;
      } else {
        len += 6;
      }
    }
    return len;
  }
  
  function GetBytes(str){
      var len = lengthBytesUTF8(str);
      var array = new Uint8Array(len);
      
      var len2 = stringToUTF8Array(str, array, 0, len + 1);
      console.log(len2);
      return array;
  }
  
  
  var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
  function UTF8ArrayToString(u8Array, idx) {
    var endPtr = idx;
    // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
    // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
    while (u8Array[endPtr]) ++endPtr;
  
    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
    } else {
      var u0, u1, u2, u3, u4, u5;
  
      var str = '';
      while (1) {
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
        u0 = u8Array[idx++];
        if (!u0) return str;
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        u1 = u8Array[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        u2 = u8Array[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u3 = u8Array[idx++] & 63;
          if ((u0 & 0xF8) == 0xF0) {
            u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
          } else {
            u4 = u8Array[idx++] & 63;
            if ((u0 & 0xFC) == 0xF8) {
              u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
            } else {
              u5 = u8Array[idx++] & 63;
              u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5;
            }
          }
        }
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
    }
  }
  // bytes : Uint8Array
  function GetString(bytes) {
      return UTF8ArrayToString(bytes,0);
  }

		var reader = new originFileReader();
		reader.addEventListener("loadend", (function() {
                    var array = new Uint8Array(reader.result);
                    console.log(UTF8ArrayToString(array,8));
                   //console.log(array);
        }));
		return reader;
	}
	if(!FileReader.injected){
			WrappedFileReader.injected = true;
            window["FileReader"] = WrappedFileReader;
            console.log("Injected success");
	} else {
		console.log("Already injected");
	}