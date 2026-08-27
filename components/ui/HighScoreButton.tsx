"use client";

import React from "react";


type Props = {
  onClick:()=>void;
};



export default function HighScoreButton({
  onClick
}:Props){


return (

<button

onClick={onClick}

style={buttonStyle}

>

🏆 HIGH SCORES

</button>

);

}




const buttonStyle:React.CSSProperties={

background:"#111",

color:"#fff",

border:"2px solid #ffea00",

borderRadius:10,

padding:"12px 20px",

fontSize:16,

fontWeight:"bold",

cursor:"pointer",

fontFamily:"monospace",

boxShadow:"0 0 10px rgba(255,234,0,.25)"

};