"use client";

import React from "react";

import {
  getHighScores,
  HighScoreEntry
} from "../../data/highScores";


type Props = {

  title?:string;

  onClose:()=>void;

};





export default function ScoreDialog({

  title="SCORING",

  onClose

}:Props){


return (

<div style={overlayStyle}>


<div style={modalStyle}>


<button

onClick={onClose}

style={closeStyle}

>

X

</button>



<h2 style={titleStyle}>

{title}

</h2>



<div style={contentStyle}>


{

title==="CONTROLS"

&&

<Controls/>

}




{

title==="SCORING"

&&

<Scoring/>

}




{

title==="HIGH SCORES"

&&

<HighScores/>

}




</div>


</div>


</div>

);

}









function Controls(){


return (

<div style={sectionStyle}>


<h3 style={sectionTitleStyle}>

MOBILE CONTROLS

</h3>



<div style={cardStyle}>

<div style={labelStyle}>

SWIPE LEFT / RIGHT

</div>

<p>

Swipe anywhere on the game area to move the falling FORM.

</p>

</div>




<div style={cardStyle}>

<div style={labelStyle}>

TAP

</div>

<p>

Tap the screen to rotate the current FORM.

</p>

</div>




<div style={cardStyle}>

<div style={labelStyle}>

SWIPE DOWN

</div>

<p>

Swipe down to activate a soft drop and move faster.

</p>

</div>




<div style={cardStyle}>

<div style={labelStyle}>

DESKTOP

</div>

<p>

Arrow keys move and rotate. ESC pauses the game.

</p>

</div>




<h3 style={sectionTitleStyle}>

OBJECTIVE

</h3>




<ul style={listStyle}>

<li>Create matching groups.</li>

<li>Clear blocks to uncover hidden FORMS.</li>

<li>Build chains for bigger scores.</li>

<li>Trigger FORM FRENZY events.</li>

</ul>




</div>

);

}









function Scoring(){


return (

<div style={sectionStyle}>


<h3 style={sectionTitleStyle}>

SCORING SYSTEM

</h3>



<div style={cardStyle}>

<div style={labelStyle}>

BLOCK CLEARS

</div>

<p>

Larger groups create larger rewards.

</p>

</div>




<div style={cardStyle}>

<div style={labelStyle}>

CHAIN BONUS

</div>

<p>

Keep clearing without stopping to build your multiplier.

</p>

</div>




<div style={cardStyle}>

<div style={labelStyle}>

FORM REVEAL

</div>

<p>

Clear enough blocks to decrypt hidden FORMS.

</p>

</div>




<div style={cardStyle}>

<div style={labelStyle}>

FORM FRENZY

</div>

<p>

Special arcade moments with faster action and higher rewards.

</p>

</div>




<h3 style={sectionTitleStyle}>

ARCADE TIPS

</h3>




<ul style={listStyle}>

<li>Watch the next piece.</li>

<li>Plan your chains.</li>

<li>Take risks for bigger rewards.</li>

</ul>




</div>

);

}








function HighScores(){


const [scores,setScores] = React.useState<HighScoreEntry[]>([]);



React.useEffect(()=>{


getHighScores()

.then(

result=>{

setScores(result);

}

);


},[]);



return (

<div style={sectionStyle}>


<h3 style={sectionTitleStyle}>

TOP 50 FORM RUNS

</h3>




<div style={highScoreListStyle}>


{

scores.length===0

?

<div style={emptyStyle}>

NO RECORDS YET

<br/>

START PLAYING TO SET THE FIRST SCORE.

</div>


:


scores.map((entry,index)=>(


<div

key={entry.id}

style={scoreBoxStyle}

>


<div style={rankStyle}>

#{index+1}

</div>



<div style={nameStyle}>

{entry.name}

</div>



<div style={scoreStyle}>

{entry.score} PTS

</div>



<div style={smallStyle}>

FORM: {entry.formName}

</div>



<div style={smallStyle}>

CATEGORY: {entry.formCategory}

</div>



<div style={smallStyle}>

TIME: {entry.time}s

</div>



</div>


))


}


</div>


</div>

);

}

const overlayStyle:React.CSSProperties={

position:"fixed",

inset:0,

zIndex:5000,

background:"rgba(0,0,0,.82)",

display:"flex",

justifyContent:"center",

alignItems:"center",

padding:"10px",

fontFamily:"monospace"

};





const modalStyle:React.CSSProperties={

position:"relative",

width:"min(92vw,420px)",

height:"85vh",

maxHeight:"85vh",

overflow:"hidden",

background:"#111",

border:"3px solid #ffea00",

borderRadius:12,

padding:16,

boxShadow:"0 0 40px #000,0 0 20px #2979ff",

boxSizing:"border-box",

display:"flex",

flexDirection:"column"

};





const closeStyle:React.CSSProperties={

position:"absolute",

right:10,

top:10,

background:"#ff1744",

color:"#fff",

border:"none",

fontWeight:"900",

fontSize:18,

borderRadius:6,

padding:"4px 10px",

cursor:"pointer"

};





const titleStyle:React.CSSProperties={

fontSize:"clamp(24px,7vw,34px)",

fontWeight:"900",

letterSpacing:3,

textAlign:"center",

color:"#ffea00",

margin:"0 0 15px",

textShadow:"3px 3px #ff1744"

};





const contentStyle:React.CSSProperties={

fontFamily:"monospace",

fontSize:14,

lineHeight:1.45,

color:"#fff",

flex:1,

minHeight:0,

overflow:"hidden"

};





const sectionStyle:React.CSSProperties={

display:"flex",

flexDirection:"column",

gap:8,

height:"100%",

minHeight:0

};





const sectionTitleStyle:React.CSSProperties={

margin:"10px 0 4px",

fontSize:17,

fontWeight:"900",

color:"#00e676",

letterSpacing:1

};





const cardStyle:React.CSSProperties={

background:"#050505",

border:"1px solid #2979ff",

borderRadius:8,

padding:10

};





const labelStyle:React.CSSProperties={

fontWeight:"900",

color:"#ffea00",

marginBottom:4,

letterSpacing:1

};





const listStyle:React.CSSProperties={

margin:"6px 0 12px",

paddingLeft:20,

lineHeight:1.5

};





const highScoreListStyle:React.CSSProperties={

flex:1,

minHeight:0,

height:"100%",

overflowY:"scroll",

WebkitOverflowScrolling:"touch",

paddingRight:6,

paddingBottom:20,

scrollbarWidth:"thin"

};





const scoreBoxStyle:React.CSSProperties={

background:"#050505",

border:"2px solid #2979ff",

borderRadius:8,

padding:10,

marginBottom:10

};





const rankStyle:React.CSSProperties={

color:"#ffea00",

fontWeight:"900",

fontSize:18

};





const nameStyle:React.CSSProperties={

color:"#fff",

fontWeight:"900",

fontSize:18

};





const scoreStyle:React.CSSProperties={

color:"#00e676",

fontWeight:"900",

fontSize:20

};





const smallStyle:React.CSSProperties={

color:"#aaa",

fontSize:12,

marginTop:3

};





const emptyStyle:React.CSSProperties={

textAlign:"center",

padding:20,

color:"#aaa",

lineHeight:1.6

};