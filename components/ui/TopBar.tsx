"use client";

import React from "react";


type Props = {

  onPause:()=>void;

  onRestart:()=>void;

  onHelp:()=>void;

  onScore:()=>void;

  onHighScores:()=>void;

};





export default function TopBar({

  onPause,

  onRestart,

  onHelp,

  onScore,

  onHighScores

}:Props){


return (

<div

style={{

  width:"100%",

  maxWidth:1100,

  display:"flex",

  justifyContent:"center",

  alignItems:"center",

  gap:"clamp(3px,1vw,8px)",

  flexWrap:"nowrap",

  marginBottom:6,

}}

>


<Button

label="PAUSE"

onClick={onPause}

/>


<Button

label="RESTART"

onClick={onRestart}

/>


<Button

label="SCORING"

onClick={onScore}

/>


<Button

label="HELP"

onClick={onHelp}

/>


<Button

label="HIGH SCORES"

onClick={onHighScores}

/>


</div>

);

}








function Button({

label,

onClick

}:{

label:string;

onClick:()=>void;

}){


return (

<button

onClick={onClick}

style={{


background:"#111",


color:"#ffea00",


border:"2px solid #2979ff",


borderRadius:8,


padding:"clamp(4px,1vw,8px) clamp(6px,1.5vw,12px)",


fontFamily:"monospace",


fontSize:"clamp(10px,2.2vw,16px)",


fontWeight:"900",


letterSpacing:"clamp(.5px,.2vw,1px)",


cursor:"pointer",


minHeight:"clamp(30px,7vw,38px)",


whiteSpace:"nowrap",


boxShadow:"0 0 8px rgba(41,121,255,.4)"


}}

>

{label}

</button>

);

}