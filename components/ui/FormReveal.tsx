"use client";

import React from "react";


type Props = {

  reveal:number;

};



export default function FormReveal({

  reveal

}:Props){


return (

<div

style={{

width:240,

background:"#111",

border:"3px solid #2979ff",

borderRadius:15,

padding:20,

textAlign:"center",

boxShadow:"0 0 25px rgba(41,121,255,.5)"

}}

>



<h2

style={{

margin:0,

marginBottom:15,

fontSize:22,

letterSpacing:3,

color:"#ffea00"

}}

>

FORM

</h2>






<div

style={{

height:280,

display:"flex",

alignItems:"center",

justifyContent:"center",

background:"#050505",

borderRadius:10,

overflow:"hidden",

position:"relative"

}}

>


<img

src="/form.png"

alt="FORM Reveal"

style={{

maxWidth:"90%",

maxHeight:"90%",

objectFit:"contain",

filter:

`brightness(${0.3 + reveal/140}) drop-shadow(0 0 ${Math.max(5,reveal/5)}px #ffea00)`,

opacity:

Math.max(

0.25,

reveal/100

),

transition:"all .5s ease"

}}

/>


</div>






<div

style={{

marginTop:15,

fontSize:24,

fontWeight:"bold",

color:"#00e676"

}}

>

{Math.floor(reveal)}%

</div>




<div

style={{

height:15,

background:"#222",

borderRadius:10,

overflow:"hidden",

marginTop:8

}}

>


<div

style={{

width:`${reveal}%`,

height:"100%",

background:"#00e676",

transition:".5s"

}}

/>


</div>



</div>

);

}