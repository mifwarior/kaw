import Component from './Component'

export default class AllianceList extends Component {

  constructor() {
    super();
    this.events = {
      "aln.inf": this.printAllianceList.bind(this)
    }
  }

  printAllianceList(event) {
    console.log(event);
    console.log(event.aln.aid +" Alliance: " + event.aln.an + " " + event.aln.at);
    var kid = 0; 
    if(event.aln.cty) {
      kid = event.aln.cty.kid;
    }
    var members = event.aln.mbl;
    for(var i =0; i< members.length; i++) {
      var user = members[i].usr;
      var l = user.lcn;
      var home = l.kid === kid;
      console.log("%c"+user.fn + " %c" + l.lx + ":" + l.ly + " %cPower: " + Math.floor(user.pwr / 1000000)+"mln", (home?"color:red;":"color:green;"), "color:blue;", "color:black;");
    }
    
  }

}