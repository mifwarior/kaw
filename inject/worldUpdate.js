class WorlUpdate{

  constructor(){
    this.modules = [];
    this.pattern = {
      "e": "wld.upd",
      "cs": null
    }
  }

  process(data, compressed){
    if(data["e"] === "wld..upd" && data["cs"]){

      for(var i = 0, len = this.modules.length; i < len; i++){
        this.modules[i].process();
      }
    }
  }
}
