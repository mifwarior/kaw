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
	
var intervalId = setInterval(function(){
	if(window["Module"]){
		clearInterval(intervalId);
		Wrap();
	}
},100);

	/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';function m(d){throw d;}var w=void 0,z=!0,aa=this;function A(d,a){var c=d.split("."),e=aa;!(c[0]in e)&&e.execScript&&e.execScript("var "+c[0]);for(var b;c.length&&(b=c.shift());)!c.length&&a!==w?e[b]=a:e=e[b]?e[b]:e[b]={}};var G="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;function I(d,a){this.index="number"===typeof a?a:0;this.i=0;this.buffer=d instanceof(G?Uint8Array:Array)?d:new (G?Uint8Array:Array)(32768);2*this.buffer.length<=this.index&&m(Error("invalid index"));this.buffer.length<=this.index&&this.f()}I.prototype.f=function(){var d=this.buffer,a,c=d.length,e=new (G?Uint8Array:Array)(c<<1);if(G)e.set(d);else for(a=0;a<c;++a)e[a]=d[a];return this.buffer=e}; I.prototype.d=function(d,a,c){var e=this.buffer,b=this.index,f=this.i,g=e[b],h;c&&1<a&&(d=8<a?(Q[d&255]<<24|Q[d>>>8&255]<<16|Q[d>>>16&255]<<8|Q[d>>>24&255])>>32-a:Q[d]>>8-a);if(8>a+f)g=g<<a|d,f+=a;else for(h=0;h<a;++h)g=g<<1|d>>a-h-1&1,8===++f&&(f=0,e[b++]=Q[g],g=0,b===e.length&&(e=this.f()));e[b]=g;this.buffer=e;this.i=f;this.index=b};I.prototype.finish=function(){var d=this.buffer,a=this.index,c;0<this.i&&(d[a]<<=8-this.i,d[a]=Q[d[a]],a++);G?c=d.subarray(0,a):(d.length=a,c=d);return c}; var ba=new (G?Uint8Array:Array)(256),ca;for(ca=0;256>ca;++ca){for(var R=ca,ha=R,ia=7,R=R>>>1;R;R>>>=1)ha<<=1,ha|=R&1,--ia;ba[ca]=(ha<<ia&255)>>>0}var Q=ba;function ja(d){this.buffer=new (G?Uint16Array:Array)(2*d);this.length=0}ja.prototype.getParent=function(d){return 2*((d-2)/4|0)};ja.prototype.push=function(d,a){var c,e,b=this.buffer,f;c=this.length;b[this.length++]=a;for(b[this.length++]=d;0<c;)if(e=this.getParent(c),b[c]>b[e])f=b[c],b[c]=b[e],b[e]=f,f=b[c+1],b[c+1]=b[e+1],b[e+1]=f,c=e;else break;return this.length}; ja.prototype.pop=function(){var d,a,c=this.buffer,e,b,f;a=c[0];d=c[1];this.length-=2;c[0]=c[this.length];c[1]=c[this.length+1];for(f=0;;){b=2*f+2;if(b>=this.length)break;b+2<this.length&&c[b+2]>c[b]&&(b+=2);if(c[b]>c[f])e=c[f],c[f]=c[b],c[b]=e,e=c[f+1],c[f+1]=c[b+1],c[b+1]=e;else break;f=b}return{index:d,value:a,length:this.length}};function S(d){var a=d.length,c=0,e=Number.POSITIVE_INFINITY,b,f,g,h,k,p,q,r,n,l;for(r=0;r<a;++r)d[r]>c&&(c=d[r]),d[r]<e&&(e=d[r]);b=1<<c;f=new (G?Uint32Array:Array)(b);g=1;h=0;for(k=2;g<=c;){for(r=0;r<a;++r)if(d[r]===g){p=0;q=h;for(n=0;n<g;++n)p=p<<1|q&1,q>>=1;l=g<<16|r;for(n=p;n<b;n+=k)f[n]=l;++h}++g;h<<=1;k<<=1}return[f,c,e]};function ka(d,a){this.h=na;this.w=0;this.input=G&&d instanceof Array?new Uint8Array(d):d;this.b=0;a&&(a.lazy&&(this.w=a.lazy),"number"===typeof a.compressionType&&(this.h=a.compressionType),a.outputBuffer&&(this.a=G&&a.outputBuffer instanceof Array?new Uint8Array(a.outputBuffer):a.outputBuffer),"number"===typeof a.outputIndex&&(this.b=a.outputIndex));this.a||(this.a=new (G?Uint8Array:Array)(32768))}var na=2,oa={NONE:0,r:1,k:na,N:3},pa=[],T; for(T=0;288>T;T++)switch(z){case 143>=T:pa.push([T+48,8]);break;case 255>=T:pa.push([T-144+400,9]);break;case 279>=T:pa.push([T-256+0,7]);break;case 287>=T:pa.push([T-280+192,8]);break;default:m("invalid literal: "+T)} ka.prototype.j=function(){var d,a,c,e,b=this.input;switch(this.h){case 0:c=0;for(e=b.length;c<e;){a=G?b.subarray(c,c+65535):b.slice(c,c+65535);c+=a.length;var f=a,g=c===e,h=w,k=w,p=w,q=w,r=w,n=this.a,l=this.b;if(G){for(n=new Uint8Array(this.a.buffer);n.length<=l+f.length+5;)n=new Uint8Array(n.length<<1);n.set(this.a)}h=g?1:0;n[l++]=h|0;k=f.length;p=~k+65536&65535;n[l++]=k&255;n[l++]=k>>>8&255;n[l++]=p&255;n[l++]=p>>>8&255;if(G)n.set(f,l),l+=f.length,n=n.subarray(0,l);else{q=0;for(r=f.length;q<r;++q)n[l++]= f[q];n.length=l}this.b=l;this.a=n}break;case 1:var s=new I(G?new Uint8Array(this.a.buffer):this.a,this.b);s.d(1,1,z);s.d(1,2,z);var t=qa(this,b),x,E,B;x=0;for(E=t.length;x<E;x++)if(B=t[x],I.prototype.d.apply(s,pa[B]),256<B)s.d(t[++x],t[++x],z),s.d(t[++x],5),s.d(t[++x],t[++x],z);else if(256===B)break;this.a=s.finish();this.b=this.a.length;break;case na:var C=new I(G?new Uint8Array(this.a.buffer):this.a,this.b),L,v,M,Y,Z,gb=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],da,Fa,ea,Ga,la,sa=Array(19), Ha,$,ma,D,Ia;L=na;C.d(1,1,z);C.d(L,2,z);v=qa(this,b);da=ra(this.L,15);Fa=ta(da);ea=ra(this.K,7);Ga=ta(ea);for(M=286;257<M&&0===da[M-1];M--);for(Y=30;1<Y&&0===ea[Y-1];Y--);var Ja=M,Ka=Y,K=new (G?Uint32Array:Array)(Ja+Ka),u,N,y,fa,J=new (G?Uint32Array:Array)(316),H,F,O=new (G?Uint8Array:Array)(19);for(u=N=0;u<Ja;u++)K[N++]=da[u];for(u=0;u<Ka;u++)K[N++]=ea[u];if(!G){u=0;for(fa=O.length;u<fa;++u)O[u]=0}u=H=0;for(fa=K.length;u<fa;u+=N){for(N=1;u+N<fa&&K[u+N]===K[u];++N);y=N;if(0===K[u])if(3>y)for(;0<y--;)J[H++]= 0,O[0]++;else for(;0<y;)F=138>y?y:138,F>y-3&&F<y&&(F=y-3),10>=F?(J[H++]=17,J[H++]=F-3,O[17]++):(J[H++]=18,J[H++]=F-11,O[18]++),y-=F;else if(J[H++]=K[u],O[K[u]]++,y--,3>y)for(;0<y--;)J[H++]=K[u],O[K[u]]++;else for(;0<y;)F=6>y?y:6,F>y-3&&F<y&&(F=y-3),J[H++]=16,J[H++]=F-3,O[16]++,y-=F}d=G?J.subarray(0,H):J.slice(0,H);la=ra(O,7);for(D=0;19>D;D++)sa[D]=la[gb[D]];for(Z=19;4<Z&&0===sa[Z-1];Z--);Ha=ta(la);C.d(M-257,5,z);C.d(Y-1,5,z);C.d(Z-4,4,z);for(D=0;D<Z;D++)C.d(sa[D],3,z);D=0;for(Ia=d.length;D<Ia;D++)if($= d[D],C.d(Ha[$],la[$],z),16<=$){D++;switch($){case 16:ma=2;break;case 17:ma=3;break;case 18:ma=7;break;default:m("invalid code: "+$)}C.d(d[D],ma,z)}var La=[Fa,da],Ma=[Ga,ea],P,Na,ga,va,Oa,Pa,Qa,Ra;Oa=La[0];Pa=La[1];Qa=Ma[0];Ra=Ma[1];P=0;for(Na=v.length;P<Na;++P)if(ga=v[P],C.d(Oa[ga],Pa[ga],z),256<ga)C.d(v[++P],v[++P],z),va=v[++P],C.d(Qa[va],Ra[va],z),C.d(v[++P],v[++P],z);else if(256===ga)break;this.a=C.finish();this.b=this.a.length;break;default:m("invalid compression type")}return this.a}; function ua(d,a){this.length=d;this.G=a} var wa=function(){function d(b){switch(z){case 3===b:return[257,b-3,0];case 4===b:return[258,b-4,0];case 5===b:return[259,b-5,0];case 6===b:return[260,b-6,0];case 7===b:return[261,b-7,0];case 8===b:return[262,b-8,0];case 9===b:return[263,b-9,0];case 10===b:return[264,b-10,0];case 12>=b:return[265,b-11,1];case 14>=b:return[266,b-13,1];case 16>=b:return[267,b-15,1];case 18>=b:return[268,b-17,1];case 22>=b:return[269,b-19,2];case 26>=b:return[270,b-23,2];case 30>=b:return[271,b-27,2];case 34>=b:return[272, b-31,2];case 42>=b:return[273,b-35,3];case 50>=b:return[274,b-43,3];case 58>=b:return[275,b-51,3];case 66>=b:return[276,b-59,3];case 82>=b:return[277,b-67,4];case 98>=b:return[278,b-83,4];case 114>=b:return[279,b-99,4];case 130>=b:return[280,b-115,4];case 162>=b:return[281,b-131,5];case 194>=b:return[282,b-163,5];case 226>=b:return[283,b-195,5];case 257>=b:return[284,b-227,5];case 258===b:return[285,b-258,0];default:m("invalid length: "+b)}}var a=[],c,e;for(c=3;258>=c;c++)e=d(c),a[c]=e[2]<<24|e[1]<< 16|e[0];return a}(),xa=G?new Uint32Array(wa):wa; function qa(d,a){function c(b,c){var a=b.G,d=[],e=0,f;f=xa[b.length];d[e++]=f&65535;d[e++]=f>>16&255;d[e++]=f>>24;var g;switch(z){case 1===a:g=[0,a-1,0];break;case 2===a:g=[1,a-2,0];break;case 3===a:g=[2,a-3,0];break;case 4===a:g=[3,a-4,0];break;case 6>=a:g=[4,a-5,1];break;case 8>=a:g=[5,a-7,1];break;case 12>=a:g=[6,a-9,2];break;case 16>=a:g=[7,a-13,2];break;case 24>=a:g=[8,a-17,3];break;case 32>=a:g=[9,a-25,3];break;case 48>=a:g=[10,a-33,4];break;case 64>=a:g=[11,a-49,4];break;case 96>=a:g=[12,a- 65,5];break;case 128>=a:g=[13,a-97,5];break;case 192>=a:g=[14,a-129,6];break;case 256>=a:g=[15,a-193,6];break;case 384>=a:g=[16,a-257,7];break;case 512>=a:g=[17,a-385,7];break;case 768>=a:g=[18,a-513,8];break;case 1024>=a:g=[19,a-769,8];break;case 1536>=a:g=[20,a-1025,9];break;case 2048>=a:g=[21,a-1537,9];break;case 3072>=a:g=[22,a-2049,10];break;case 4096>=a:g=[23,a-3073,10];break;case 6144>=a:g=[24,a-4097,11];break;case 8192>=a:g=[25,a-6145,11];break;case 12288>=a:g=[26,a-8193,12];break;case 16384>= a:g=[27,a-12289,12];break;case 24576>=a:g=[28,a-16385,13];break;case 32768>=a:g=[29,a-24577,13];break;default:m("invalid distance")}f=g;d[e++]=f[0];d[e++]=f[1];d[e++]=f[2];var h,k;h=0;for(k=d.length;h<k;++h)n[l++]=d[h];t[d[0]]++;x[d[3]]++;s=b.length+c-1;r=null}var e,b,f,g,h,k={},p,q,r,n=G?new Uint16Array(2*a.length):[],l=0,s=0,t=new (G?Uint32Array:Array)(286),x=new (G?Uint32Array:Array)(30),E=d.w,B;if(!G){for(f=0;285>=f;)t[f++]=0;for(f=0;29>=f;)x[f++]=0}t[256]=1;e=0;for(b=a.length;e<b;++e){f=h=0; for(g=3;f<g&&e+f!==b;++f)h=h<<8|a[e+f];k[h]===w&&(k[h]=[]);p=k[h];if(!(0<s--)){for(;0<p.length&&32768<e-p[0];)p.shift();if(e+3>=b){r&&c(r,-1);f=0;for(g=b-e;f<g;++f)B=a[e+f],n[l++]=B,++t[B];break}0<p.length?(q=ya(a,e,p),r?r.length<q.length?(B=a[e-1],n[l++]=B,++t[B],c(q,0)):c(r,-1):q.length<E?r=q:c(q,0)):r?c(r,-1):(B=a[e],n[l++]=B,++t[B])}p.push(e)}n[l++]=256;t[256]++;d.L=t;d.K=x;return G?n.subarray(0,l):n} function ya(d,a,c){var e,b,f=0,g,h,k,p,q=d.length;h=0;p=c.length;a:for(;h<p;h++){e=c[p-h-1];g=3;if(3<f){for(k=f;3<k;k--)if(d[e+k-1]!==d[a+k-1])continue a;g=f}for(;258>g&&a+g<q&&d[e+g]===d[a+g];)++g;g>f&&(b=e,f=g);if(258===g)break}return new ua(f,a-b)} function ra(d,a){var c=d.length,e=new ja(572),b=new (G?Uint8Array:Array)(c),f,g,h,k,p;if(!G)for(k=0;k<c;k++)b[k]=0;for(k=0;k<c;++k)0<d[k]&&e.push(k,d[k]);f=Array(e.length/2);g=new (G?Uint32Array:Array)(e.length/2);if(1===f.length)return b[e.pop().index]=1,b;k=0;for(p=e.length/2;k<p;++k)f[k]=e.pop(),g[k]=f[k].value;h=za(g,g.length,a);k=0;for(p=f.length;k<p;++k)b[f[k].index]=h[k];return b} function za(d,a,c){function e(b){var c=k[b][p[b]];c===a?(e(b+1),e(b+1)):--g[c];++p[b]}var b=new (G?Uint16Array:Array)(c),f=new (G?Uint8Array:Array)(c),g=new (G?Uint8Array:Array)(a),h=Array(c),k=Array(c),p=Array(c),q=(1<<c)-a,r=1<<c-1,n,l,s,t,x;b[c-1]=a;for(l=0;l<c;++l)q<r?f[l]=0:(f[l]=1,q-=r),q<<=1,b[c-2-l]=(b[c-1-l]/2|0)+a;b[0]=f[0];h[0]=Array(b[0]);k[0]=Array(b[0]);for(l=1;l<c;++l)b[l]>2*b[l-1]+f[l]&&(b[l]=2*b[l-1]+f[l]),h[l]=Array(b[l]),k[l]=Array(b[l]);for(n=0;n<a;++n)g[n]=c;for(s=0;s<b[c-1];++s)h[c- 1][s]=d[s],k[c-1][s]=s;for(n=0;n<c;++n)p[n]=0;1===f[c-1]&&(--g[0],++p[c-1]);for(l=c-2;0<=l;--l){t=n=0;x=p[l+1];for(s=0;s<b[l];s++)t=h[l+1][x]+h[l+1][x+1],t>d[n]?(h[l][s]=t,k[l][s]=a,x+=2):(h[l][s]=d[n],k[l][s]=n,++n);p[l]=0;1===f[l]&&e(l)}return g} function ta(d){var a=new (G?Uint16Array:Array)(d.length),c=[],e=[],b=0,f,g,h,k;f=0;for(g=d.length;f<g;f++)c[d[f]]=(c[d[f]]|0)+1;f=1;for(g=16;f<=g;f++)e[f]=b,b+=c[f]|0,b<<=1;f=0;for(g=d.length;f<g;f++){b=e[d[f]];e[d[f]]+=1;h=a[f]=0;for(k=d[f];h<k;h++)a[f]=a[f]<<1|b&1,b>>>=1}return a};function U(d,a){this.l=[];this.m=32768;this.e=this.g=this.c=this.q=0;this.input=G?new Uint8Array(d):d;this.s=!1;this.n=Aa;this.B=!1;if(a||!(a={}))a.index&&(this.c=a.index),a.bufferSize&&(this.m=a.bufferSize),a.bufferType&&(this.n=a.bufferType),a.resize&&(this.B=a.resize);switch(this.n){case Ba:this.b=32768;this.a=new (G?Uint8Array:Array)(32768+this.m+258);break;case Aa:this.b=0;this.a=new (G?Uint8Array:Array)(this.m);this.f=this.J;this.t=this.H;this.o=this.I;break;default:m(Error("invalid inflate mode"))}} var Ba=0,Aa=1,Ca={D:Ba,C:Aa}; U.prototype.p=function(){for(;!this.s;){var d=V(this,3);d&1&&(this.s=z);d>>>=1;switch(d){case 0:var a=this.input,c=this.c,e=this.a,b=this.b,f=a.length,g=w,h=w,k=e.length,p=w;this.e=this.g=0;c+1>=f&&m(Error("invalid uncompressed block header: LEN"));g=a[c++]|a[c++]<<8;c+1>=f&&m(Error("invalid uncompressed block header: NLEN"));h=a[c++]|a[c++]<<8;g===~h&&m(Error("invalid uncompressed block header: length verify"));c+g>a.length&&m(Error("input buffer is broken"));switch(this.n){case Ba:for(;b+g>e.length;){p= k-b;g-=p;if(G)e.set(a.subarray(c,c+p),b),b+=p,c+=p;else for(;p--;)e[b++]=a[c++];this.b=b;e=this.f();b=this.b}break;case Aa:for(;b+g>e.length;)e=this.f({v:2});break;default:m(Error("invalid inflate mode"))}if(G)e.set(a.subarray(c,c+g),b),b+=g,c+=g;else for(;g--;)e[b++]=a[c++];this.c=c;this.b=b;this.a=e;break;case 1:this.o(Da,Ea);break;case 2:for(var q=V(this,5)+257,r=V(this,5)+1,n=V(this,4)+4,l=new (G?Uint8Array:Array)(Sa.length),s=w,t=w,x=w,E=w,B=w,C=w,L=w,v=w,M=w,v=0;v<n;++v)l[Sa[v]]=V(this,3);if(!G){v= n;for(n=l.length;v<n;++v)l[Sa[v]]=0}s=S(l);E=new (G?Uint8Array:Array)(q+r);v=0;for(M=q+r;v<M;)switch(B=Ta(this,s),B){case 16:for(L=3+V(this,2);L--;)E[v++]=C;break;case 17:for(L=3+V(this,3);L--;)E[v++]=0;C=0;break;case 18:for(L=11+V(this,7);L--;)E[v++]=0;C=0;break;default:C=E[v++]=B}t=G?S(E.subarray(0,q)):S(E.slice(0,q));x=G?S(E.subarray(q)):S(E.slice(q));this.o(t,x);break;default:m(Error("unknown BTYPE: "+d))}}return this.t()}; var Ua=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Sa=G?new Uint16Array(Ua):Ua,Va=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],Wa=G?new Uint16Array(Va):Va,Xa=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],Ya=G?new Uint8Array(Xa):Xa,Za=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],$a=G?new Uint16Array(Za):Za,ab=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],bb=G?new Uint8Array(ab):ab,cb=new (G?Uint8Array:Array)(288),W,db;W=0;for(db=cb.length;W<db;++W)cb[W]=143>=W?8:255>=W?9:279>=W?7:8;var Da=S(cb),eb=new (G?Uint8Array:Array)(30),fb,hb;fb=0;for(hb=eb.length;fb<hb;++fb)eb[fb]=5;var Ea=S(eb);function V(d,a){for(var c=d.g,e=d.e,b=d.input,f=d.c,g=b.length,h;e<a;)f>=g&&m(Error("input buffer is broken")),c|=b[f++]<<e,e+=8;h=c&(1<<a)-1;d.g=c>>>a;d.e=e-a;d.c=f;return h} function Ta(d,a){for(var c=d.g,e=d.e,b=d.input,f=d.c,g=b.length,h=a[0],k=a[1],p,q;e<k&&!(f>=g);)c|=b[f++]<<e,e+=8;p=h[c&(1<<k)-1];q=p>>>16;q>e&&m(Error("invalid code length: "+q));d.g=c>>q;d.e=e-q;d.c=f;return p&65535}U.prototype.o=function(d,a){var c=this.a,e=this.b;this.u=d;for(var b=c.length-258,f,g,h,k;256!==(f=Ta(this,d));)if(256>f)e>=b&&(this.b=e,c=this.f(),e=this.b),c[e++]=f;else{g=f-257;k=Wa[g];0<Ya[g]&&(k+=V(this,Ya[g]));f=Ta(this,a);h=$a[f];0<bb[f]&&(h+=V(this,bb[f]));e>=b&&(this.b=e,c=this.f(),e=this.b);for(;k--;)c[e]=c[e++-h]}for(;8<=this.e;)this.e-=8,this.c--;this.b=e};U.prototype.I=function(d,a){var c=this.a,e=this.b;this.u=d;for(var b=c.length,f,g,h,k;256!==(f=Ta(this,d));)if(256>f)e>=b&&(c=this.f(),b=c.length),c[e++]=f;else{g=f-257;k=Wa[g];0<Ya[g]&&(k+=V(this,Ya[g]));f=Ta(this,a);h=$a[f];0<bb[f]&&(h+=V(this,bb[f]));e+k>b&&(c=this.f(),b=c.length);for(;k--;)c[e]=c[e++-h]}for(;8<=this.e;)this.e-=8,this.c--;this.b=e};U.prototype.f=function(){var d=new (G?Uint8Array:Array)(this.b-32768),a=this.b-32768,c,e,b=this.a;if(G)d.set(b.subarray(32768,d.length));else{c=0;for(e=d.length;c<e;++c)d[c]=b[c+32768]}this.l.push(d);this.q+=d.length;if(G)b.set(b.subarray(a,a+32768));else for(c=0;32768>c;++c)b[c]=b[a+c];this.b=32768;return b};U.prototype.J=function(d){var a,c=this.input.length/this.c+1|0,e,b,f,g=this.input,h=this.a;d&&("number"===typeof d.v&&(c=d.v),"number"===typeof d.F&&(c+=d.F));2>c?(e=(g.length-this.c)/this.u[2],f=258*(e/2)|0,b=f<h.length?h.length+f:h.length<<1):b=h.length*c;G?(a=new Uint8Array(b),a.set(h)):a=h;return this.a=a};U.prototype.t=function(){var d=0,a=this.a,c=this.l,e,b=new (G?Uint8Array:Array)(this.q+(this.b-32768)),f,g,h,k;if(0===c.length)return G?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);f=0;for(g=c.length;f<g;++f){e=c[f];h=0;for(k=e.length;h<k;++h)b[d++]=e[h]}f=32768;for(g=this.b;f<g;++f)b[d++]=a[f];this.l=[];return this.buffer=b};U.prototype.H=function(){var d,a=this.b;G?this.B?(d=new Uint8Array(a),d.set(this.a.subarray(0,a))):d=this.a.subarray(0,a):(this.a.length>a&&(this.a.length=a),d=this.a);return this.buffer=d};function ib(d){if("string"===typeof d){var a=d.split(""),c,e;c=0;for(e=a.length;c<e;c++)a[c]=(a[c].charCodeAt(0)&255)>>>0;d=a}for(var b=1,f=0,g=d.length,h,k=0;0<g;){h=1024<g?1024:g;g-=h;do b+=d[k++],f+=b;while(--h);b%=65521;f%=65521}return(f<<16|b)>>>0};function jb(d,a){var c,e;this.input=d;this.c=0;if(a||!(a={}))a.index&&(this.c=a.index),a.verify&&(this.M=a.verify);c=d[this.c++];e=d[this.c++];switch(c&15){case kb:this.method=kb;break;default:m(Error("unsupported compression method"))}0!==((c<<8)+e)%31&&m(Error("invalid fcheck flag:"+((c<<8)+e)%31));e&32&&m(Error("fdict flag is not supported"));this.A=new U(d,{index:this.c,bufferSize:a.bufferSize,bufferType:a.bufferType,resize:a.resize})}jb.prototype.p=function(){var d=this.input,a,c;a=this.A.p();this.c=this.A.c;this.M&&(c=(d[this.c++]<<24|d[this.c++]<<16|d[this.c++]<<8|d[this.c++])>>>0,c!==ib(a)&&m(Error("invalid adler-32 checksum")));return a};var kb=8;function lb(d,a){this.input=d;this.a=new (G?Uint8Array:Array)(32768);this.h=X.k;var c={},e;if((a||!(a={}))&&"number"===typeof a.compressionType)this.h=a.compressionType;for(e in a)c[e]=a[e];c.outputBuffer=this.a;this.z=new ka(this.input,c)}var X=oa;lb.prototype.j=function(){var d,a,c,e,b,f,g,h=0;g=this.a;d=kb;switch(d){case kb:a=Math.LOG2E*Math.log(32768)-8;break;default:m(Error("invalid compression method"))}c=a<<4|d;g[h++]=c;switch(d){case kb:switch(this.h){case X.NONE:b=0;break;case X.r:b=1;break;case X.k:b=2;break;default:m(Error("unsupported compression type"))}break;default:m(Error("invalid compression method"))}e=b<<6|0;g[h++]=e|31-(256*c+e)%31;f=ib(this.input);this.z.b=h;g=this.z.j();h=g.length;G&&(g=new Uint8Array(g.buffer),g.length<=h+4&&(this.a=new Uint8Array(g.length+4),this.a.set(g),g=this.a),g=g.subarray(0,h+4));g[h++]=f>>24&255;g[h++]=f>>16&255;g[h++]=f>>8&255;g[h++]=f&255;return g};function mb(d,a){var c,e,b,f;if(Object.keys)c=Object.keys(a);else for(e in c=[],b=0,a)c[b++]=e;b=0;for(f=c.length;b<f;++b)e=c[b],A(d+"."+e,a[e])};A("Zlib.Inflate",jb);A("Zlib.Inflate.prototype.decompress",jb.prototype.p);mb("Zlib.Inflate.BufferType",{ADAPTIVE:Ca.C,BLOCK:Ca.D});A("Zlib.Deflate",lb);A("Zlib.Deflate.compress",function(d,a){return(new lb(d,a)).j()});A("Zlib.Deflate.prototype.compress",lb.prototype.j);mb("Zlib.Deflate.CompressionType",{NONE:X.NONE,FIXED:X.r,DYNAMIC:X.k});}).call(this);
   
   
function Wrap(){	
	if(!window["Module"]) return;
	if(window["FileReader"].injected) return;
	var originFileReader = window["FileReader"];
	
	var enemyTiles = {"lv":null, "kid":54, "usr":{
		"phn":{
			"kid":22
		}
	}};
	var worldUpdate = {
		"e": "wld.upd",
		"cs": null
	};
	function GetCoord(object){
		return { x:object["lx"], y:object["ly"] };
	}

	function ValidateFunc(pattern, object){
		try{
		if(pattern === null && object !== undefined) return true;
		if(pattern !== null && pattern === object) return true;
		
		if(typeof(object) !== "object") return false;
		
		for(var key in pattern){
			if(!object[key] || !ValidateFunc(pattern[key], object[key])) { 
				return false;
			}
		}
		return true;
		} catch(e){
			console.error(e);
			console.log(pattern, object);
			return false;
		}
	}

	function Find(pattern, object){
		if(ValidateFunc(pattern, object)){
			return GetCoord(object);	
		}
	}
	
	function WrappedFileReader(){
		
		
	     
		function bytesToInt(bytes, offset, littleEndian){
			if( littleEndian) { 
				return (bytes[offset]) | (bytes[offset + 1] << 8)  | (bytes[offset + 2] << 16) | (bytes[offset +3] << 24);
            } else {
                return (bytes[offset] << 24) | (bytes[offset+1] << 16)  | (bytes[offset+2] << 8) | (bytes[offset+3]);
            }
		}
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
						if(array[0] !== 6) return;
						
						var compressed = ((array[1] & 1) != 0);
						var size = bytesToInt(array,4);
						
						if(compressed){
													
							try{
								var compressedArray = array.slice(12);
								var decompressed = new Zlib.Inflate(compressedArray).decompress();
								var json = UTF8ArrayToString(decompressed,0);
								var data = JSON.parse(json);
								for(var i =0; data.length && i< data.length; i++){

									if(ValidateFunc(worldUpdate, data[i])){
										var tiles = data[i]["cs"];
										for( var n = 0; tiles.length && n < tiles.length; n++)
										{
											var coords = Find(enemyTiles, tiles[n]);
											if(coords) {
												console.log(coords);
											}			
										}
									}
								}
								
							} catch(e) { 
								console.error(e); 
								console.log(array);
							}
						} else {
							//var json = UTF8ArrayToString(array,8);
							//console.log(size, array.length, json);
						}
						
						
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
}