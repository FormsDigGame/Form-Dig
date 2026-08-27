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

gap:8,

flexWrap:"wrap",

marginBottom:6

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

padding:"8px 12px",

fontFamily:"monospace",

fontSize:"clamp(12px,2.8vw,16px)",

fontWeight:"900",

letterSpacing:1,

cursor:"pointer",

minHeight:38,

whiteSpace:"nowrap",

boxShadow:"0 0 8px rgba(41,121,255,.4)"

}}

>

{label}

</button>

);

}