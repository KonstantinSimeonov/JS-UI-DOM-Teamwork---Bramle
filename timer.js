/* Evolved from DHTML version 
   @ http://www.dhteumeuleu.com */
var xmlns="http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink"; 
var backX0;
var backY0;
var backWidth;
var backHeight;
var O=[];
var TM=[];
var Tm=[];
var A = 1000;
var digits = [
" ###   #  #### #### #   ###### ### ##### ###  ###      ",
"#   #  #      #    ##   ##    #   #    ##   ##   #     ",
"#   #  #      #    ##   ##    #        ##   ##   #  #  ",
"#   #  #   ###  ### ######### ####     # ###  ####     ",
"#   #  #  #        #    #    ##   #    ##   #    #  #  ",
"#   #  #  #        #    #    ##   #    ##   ##   #     ",
" ###   #  #########     #####  ###     # ###  ###      "
];
function startUp() {
      var myBack = document.getElementById("backGround");
      backX0 = myBack.getAttributeNS(null,"x");
      backY0 = myBack.getAttributeNS(null,"y");
      backWidth = myBack.getAttributeNS(null,"width");
      backHeight = myBack.getAttributeNS(null,"height");
      dayDisplay();
	timer();
	
      /* 
         k        0  1  2  3  4  5  6  7   -> 1st args of Cdigit
        display   *  *  :  *  *  :  *  *   -> 2nd args of Cdigit 
                                              ('10' for ':')
      */
      var k=0;   
	for(var i=0;i<6;i++){
		O[k] = new Cdigit(k++, TM[i]);
		if(i==1 || i==3) O[k] = new Cdigit(k++, 10);
	}      
	mainloop();
};
/* Input for Cdigit
   N = 0-7
   d = 0-9 or 10 */
  
function Cdigit(N,d){
	// digit prototype: 5 x 7 dots for each of digit from 0 to 9
	this.O = [];
	for(var i=0;i<7;i++){
		for(var j=0;j<5;j++){
			if(digits[i].charAt(5*d+j)!=" "){
				this.O.push(
                              // COjb(this.a, this.z)
					new CObj((
						(28*N)+(j*5))/(180/Math.PI),
						-42+i*12
					)
				);
			}
		}
	}
}
function CObj(a,z){
	// create led element
	this.o = document.createElementNS(xmlns,"circle");
	document.getElementById("clock3D").appendChild(this.o);
	this.a=a;
	this.z=z;
	this.plot=true;
}
// leds lighting
// main 3D function
CObj.prototype.anim=function() {
		// z axis rotation
            var x=Math.sin(A+this.a)*100;
		var y=Math.cos(A+this.a)*100;
		// simple 3D
		var x1=y;
		var zz=this.z;
		var y1=-zz;
		zz=x;
		// 2D projection
		var r=396/(396+zz);
		x=Math.round(backWidth/2-x1/r)+parseFloat(backX0);
		y=Math.round(backHeight/2-y1/r)+parseFloat(backY0);
		// leds lighting
		if(zz>0){
				this.o.setAttributeNS(null,"fill","#ff0000");
      			this.o.setAttributeNS(null,"cx",x);
      			this.o.setAttributeNS(null,"cy",y);
      			this.o.setAttributeNS(null,"r","5");
				this.o.setAttributeNS(null,"opacity","1.0");
		} 
		else {
                        this.o.setAttributeNS(null,"fill","#00ff00");
      			this.o.setAttributeNS(null,"cx",x);
      			this.o.setAttributeNS(null,"cy",y);
      			this.o.setAttributeNS(null,"r","5");
                        this.o.setAttributeNS(null,"opacity","0.3");
		}  	
	}
function mainloop() {
	// rotation speed
	A-=Math.PI/120; 
	// refresh time
	k=0;
	for(var i=0;i<6;i++){
		if(TM[i]!=Tm[i]){
			Tm[i]=TM[i];
			// destroy objects
			for(var j in O[k].O)document.getElementById("clock3D").removeChild(O[k].O[j].o);
			delete O[k];
			// create new digit
			O[k] = new Cdigit(k, TM[i]);
		}
            // skip colons
		k+=(i==1 || i==3)?2:1;
	}
	// call animation
	for(var i in O){
		for(var j in O[i].O){
			O[i].O[j].anim();
		}
	}
	setTimeout("mainloop()",20);
}
var curent = new Date();
function timer(){
	// HH:MM:SS
	T = new Date();
	h = T.getHours() - curent.getHours();
	m = T.getMinutes() - curent.getMinutes();
	s = T.getSeconds() - curent.getSeconds();
	
	TM = [
		Math.floor(h/10),
		h%10,
		Math.floor(m/10),
		m%10,
		Math.floor(s/10),
		s%10
	];
	setTimeout("timer()" ,1000); 
}
function dayDisplay()
{
	var dayName = 
         new Array("Sunday","Monday","Tuesday","Thursday",
					"Friday","Saturday");
      var monthName = 
         new Array("January","February","March","April","May","June","July",
"August","September","October","November","December");
	var today = new Date();
	document.getElementById("date").firstChild.nodeValue = 
			'Have fun with "Catan Bramble"'
          		;
}