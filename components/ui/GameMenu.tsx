"use client";

import React from "react";


type Props = {

  onPause:()=>void;

  onRestart:()=>void;

  onHelp:()=>void;

  onScore:()=>void;

};



export default function GameMenu({

  onPause,

  onRestart,

  onHelp,

  onScore

}:Props){



return (

<div style={menuStyle}>


<button

onClick={onPause}

style={buttonStyle}

>

⏸ PAUSE

</button>




<button

onClick={onRestart}

style={buttonStyle}

>

↻ RESTART

</button>




<button

onClick={onHelp}

style={buttonStyle}

>

? CONTROLS

</button>




<button

onClick={onScore}

style={buttonStyle}

>

★ SCORING

</button>



</div>

);

}





const menuStyle:React.CSSProperties={

display:"flex",

gap:10,

width:"100%",

justifyContent:"center",

alignItems:"center",

flexWrap:"wrap",

marginBottom:20

};





const buttonStyle:React.CSSProperties={

background:"#111",

color:"#fff",

border:"2px solid #ffea00",

borderRadius:10,

padding:"12px 18px",

fontSize:16,

fontWeight:"bold",

cursor:"pointer",

fontFamily:"monospace",

whiteSpace:"nowrap"

};