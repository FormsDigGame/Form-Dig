"use client";

import React from "react";


type Props = {
  reveal:number;
};



export default function ProfilePanel({
  reveal
}:Props){


return (

<div style={panelStyle}>


<h3 style={titleStyle}>
FORM PROFILE
</h3>




<div style={imageBoxStyle}>

<div style={imagePlaceholderStyle}>

FORM

</div>

</div>





<div style={labelStyle}>
FORM REVEAL
</div>



<div style={barBackground}>

<div

style={{

...barFill,

width:`${reveal}%`

}}

/>

</div>




<div style={percentStyle}>

{Math.floor(reveal)}%

</div>




</div>

);

}





const panelStyle:React.CSSProperties={

background:"#111",

border:"2px solid #444",

borderRadius:10,

padding:15,

width:220,

textAlign:"center",

fontFamily:"monospace"

};





const titleStyle:React.CSSProperties={

margin:"0 0 15px 0",

fontSize:20,

color:"#ffea00",

letterSpacing:2

};





const imageBoxStyle:React.CSSProperties={

width:"100%",

height:180,

display:"flex",

justifyContent:"center",

alignItems:"center",

marginBottom:15,

borderRadius:10,

background:"#050505",

border:"2px solid #333",

overflow:"hidden"

};





const imagePlaceholderStyle:React.CSSProperties={

width:120,

height:120,

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center",

background:"#222",

border:"3px solid #ffea00",

fontSize:28,

fontWeight:"bold",

color:"#ffea00"

};





const labelStyle:React.CSSProperties={

fontSize:16,

marginBottom:8

};





const barBackground:React.CSSProperties={

height:20,

background:"#222",

borderRadius:10,

overflow:"hidden",

border:"1px solid #555"

};





const barFill:React.CSSProperties={

height:"100%",

background:"#00e676",

transition:"width .5s ease"

};





const percentStyle:React.CSSProperties={

marginTop:8,

fontSize:22,

fontWeight:"bold"

};