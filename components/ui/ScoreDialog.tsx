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

HOW TO PLAY

</h3>



<div style={cardStyle}>

<div style={labelStyle}>

MOVE

</div>

<div>

← → Arrow Keys

</div>

<p>

Move the falling FORM left and right.

</p>

</div>



<div style={cardStyle}>

<div style={labelStyle}>

ROTATE

</div>

<div>

↑ Arrow Key

</div>

<p>

Rotate pieces into the best position.

</p>

</div>



<div style={cardStyle}>

<div style={labelStyle}>

DROP

</div>

<div>

↓ Arrow Key

</div>

<p>

Drop pieces faster when ready.

</p>

</div>



<div style={cardStyle}>

<div style={labelStyle}>

PAUSE

</div>

<div>

ESC

</div>

<p>

Pause or resume the game.

</p>

</div>



<h3 style={sectionTitleStyle}>

OBJECTIVE

</h3>



<ul style={listStyle}>

<li>Create matching groups.</li>

<li>Clear blocks to reveal hidden FORMS.</li>

<li>Build chains for higher scores.</li>

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

Larger groups create bigger point rewards.

</p>

</div>



<div style={cardStyle}>

<div style={labelStyle}>

CHAIN BONUS

</div>

<p>

Keep clearing groups to increase your multiplier.

</p>

</div>



<div style={cardStyle}>

<div style={labelStyle}>

FORM REVEAL

</div>

<p>

Discover hidden FORMS by clearing the board.

</p>

</div>



<div style={cardStyle}>

<div style={labelStyle}>

FORM FRENZY

</div>

<p>

Special moments with faster action and bigger rewards.

</p>

</div>



<h3 style={sectionTitleStyle}>

ARCADE TIPS

</h3>



<ul style={listStyle}>

<li>Plan ahead using the next piece.</li>

<li>Create long chains whenever possible.</li>

<li>Save risky moves for big rewards.</li>

</ul>



</div>

);

}

function HighScores(){


const scores:HighScoreEntry[] = getHighScores();



return (

<div style={sectionStyle}>


<h3 style={sectionTitleStyle}>

TOP FORM RUNS

</h3>



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

padding:"15px",

fontFamily:"monospace"

};



const modalStyle:React.CSSProperties={

position:"relative",

width:"min(92vw,420px)",

maxHeight:"85vh",

overflowY:"auto",

background:"#111",

border:"3px solid #ffea00",

borderRadius:12,

padding:18,

boxShadow:"0 0 40px #000, 0 0 20px #2979ff"

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

margin:"0 0 18px",

textShadow:"3px 3px #ff1744"

};



const contentStyle:React.CSSProperties={

fontFamily:"monospace",

fontSize:15,

lineHeight:1.5,

color:"#fff"

};



const sectionStyle:React.CSSProperties={

display:"flex",

flexDirection:"column",

gap:10

};



const sectionTitleStyle:React.CSSProperties={

margin:"12px 0 4px",

fontSize:18,

fontWeight:"900",

color:"#00e676",

letterSpacing:1

};



const cardStyle:React.CSSProperties={

background:"#050505",

border:"1px solid #2979ff",

borderRadius:8,

padding:10,

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

lineHeight:1.6

};



const scoreBoxStyle:React.CSSProperties={

background:"#050505",

border:"2px solid #2979ff",

borderRadius:8,

padding:10,

marginBottom:10,

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