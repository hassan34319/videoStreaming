import{H as t,s as i,a as r}from"./index-ok-HFIDC.js";class d extends t{constructor(s,e){super(s,e),this.$$PROVIDER_TYPE="AUDIO",i(()=>{this.airPlay=new r(this.media,e)},this.scope)}get type(){return"audio"}setup(){super.setup(),this.type==="audio"&&this.b.delegate.c("provider-setup",this)}get audio(){return this.a}}export{d as AudioProvider};
