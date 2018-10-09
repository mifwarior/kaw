

window["coordList"] = {};
window["coordsCount"] = 0;
window["DumpLog"] = false;
window["enemyTiles"] = {
	//cid:null,
	dt: -1,
	ft: null,
	//"lv":null, // farmtile
	"kid": 54, //52
	"usr": {
		//"aln":{ aid:48324}, // alliance
		"phn": {
			"kid": 16 // kingdom
		}
	}
};

window["PrintCoords"] = function PrintCoords() {
	var keys = Object.keys(window["coordList"]);
	console.log(keys);
};
window["ClearCoords"] = function ClearCoords() {
	window["coordList"] = {};
	window["coordsCount"] = 0;
};

var intervalId = setInterval(function () {
	if (window["Module"]) {
		clearInterval(intervalId);
		Inject();
	}
}, 100);

function Inject() {
	if (!window["Module"]) return;
	if (window["FileReader"].injected) return;
	var originFileReader = window["FileReader"];

	var worldUpdate = {
		"e": "wld.upd",
		"cs": null
	};
	function GetCoord(object) {
		return { x: object["lx"], y: object["ly"] };
	}

	function ValidateFunc(pattern, object) {
		try {
			if (pattern === null && object !== undefined) return true;
			if (pattern !== null && pattern === object) return true;
			if ((pattern | 0) < 0 && ((object | 0) < 0 || !(object.length))) return true;

			if (typeof (object) !== "object") return false;

			for (var key in pattern) {
				if (!object[key] || !ValidateFunc(pattern[key], object[key])) {
					return false;
				}
			}
			return true;
		} catch (e) {
			console.error(e);
			console.log(pattern, object);
			return false;
		}
	}

	function Find(pattern, object) {
		if (ValidateFunc(pattern, object)) {
			return GetCoord(object);
		}
	}

	function WrappedFileReader() {



		var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
		function UTF8ArrayToString(u8Array, idx) {
			var endPtr = idx;
			// TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
			// Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
			while (u8Array[endPtr])++endPtr;

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


		var reader = new originFileReader();
		reader.addEventListener("loadend", (function () {
			var array = new Uint8Array(reader.result);
			if (array[0] !== 6) return;

			var compressed = ((array[1] & 1) != 0);

			if (compressed) {

				try {
					var compressedArray = array.slice(12);
					var decompressed = new Zlib.Inflate(compressedArray).decompress();
					var json = UTF8ArrayToString(decompressed, 0);
					var data = JSON.parse(json);
					for (var i = 0; data.length && i < data.length; i++) {

						if (ValidateFunc(worldUpdate, data[i])) {
							var tiles = data[i]["cs"];
							for (var n = 0; tiles.length && n < tiles.length; n++) {
								if (window["DumpLog"]) {
									console.log(tiles[n]);
								}
								var coords = Find(enemyTiles, tiles[n]);
								if (coords) {
									var key = coords.x + ":" + coords.y;
									if (!window["coordList"][key]) {
										window["coordList"][key] = coords;
										window["coordsCount"]++;
										console.log("Found coords: " + window["coordsCount"], coords);
									}
								}
							}
						}
					}

				} catch (e) {
					console.error(e);
					console.log(array);
				}
			} else {
				//var json = UTF8ArrayToString(array,8);
				//console.log(size, array.length, json);
			}
		}));
		return reader;
	}
	if (!FileReader.injected) {
		WrappedFileReader.injected = true;
		window["FileReader"] = WrappedFileReader;
		console.log("Injected success");
	} else {
		console.log("Already injected");
	}
}