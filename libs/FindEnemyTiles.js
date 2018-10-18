/*
var test = {
	bst: [], 
	cid: 8,
	kid: 54,
	lid: 6,
	lv: 7,
	lx: 251,
	ly: 491,
	usr: {
		aln:{
			ag: "7;1;0;0"
		},
		cty:{
			g: false,
			kid: 22
		},
		phn: {
			ct: 6,
			kid: 22,
			pt: "2018-09-05T00:00:00Z",
			pts: 1536105600,
			tid: 101456,
			x: 285,
			y: 503,
		}

	}
}

var enemyTiles = {
	"lv":null, 
	"kid":54, 
	"usr":{
		"aln":{ aid:48324},
		"phn":{
			"kid":null
		}
}};
var worldUpdate = {
	"e": "wld.upd",
	"cs": null
};
*/
function GetCoord(object){
	return { x:object["lx"], y:object["ly"] };
}

function ValidateFunc(pattern, object){
		if(pattern === null && object !== undefined) return true;
		if(pattern !== null && pattern === object) return true;
		
		if(typeof(object) !== "object") return false;
		
		for(var key in pattern){
			if(!object[key] || !ValidateFunc(pattern[key], object[key])) { 
				return false;
			}
		}
		return true;
}

function Find(pattern, object){
	if(ValidateFunc(pattern, object)){
		return GetCoord(object);	
	}
}
