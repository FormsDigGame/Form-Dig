"use client";

import React, {
  useEffect,
  useState
} from "react";

import {
  Form
} from "../../data/forms";





type Props = {

  score:number;

  form:Form|null;

  qualifies:boolean;

  submitted:boolean;


  onSubmitScore:(name:string)=>void;

  onRestart:()=>void;

  onHighScores:()=>void;

  onExit:()=>void;

};









export default function GameOverOverlay({

  score,

  form,

  qualifies,

  submitted,

  onSubmitScore,

  onRestart,

  onHighScores,

  onExit

}:Props){



const [name,setName] = useState("");








useEffect(()=>{


function handleKey(

e:KeyboardEvent

){


if(

e.key==="Enter"

&&

qualifies

&&

!submitted

){

submit();

}


}



window.addEventListener(

"keydown",

handleKey

);



return()=>{

window.removeEventListener(

"keydown",

handleKey

);

};



},[
name,
qualifies,
submitted
]);









function submit(){


if(

!name.trim()

){

return;

}



onSubmitScore(

name.trim()

);



}









return (

<div

className="game-over-overlay"

>





<div

className="game-over-panel"

>





<h1>

GAME OVER

</h1>





<div className="score-title">

FINAL SCORE

</div>



<div className="score-number">

{score}

</div>









{

form &&

<div

className="form-result"

>



<div className="image-holder">

<img

src={form.image}

alt={form.name}

/>

</div>





<div className="form-name">

{form.name}

</div>





<div className="category-label">

CATEGORY

</div>





<div className="category">

{form.category}

</div>



</div>

}









{

qualifies && !submitted &&

<div

className="submit-box"

>



<div className="high-score-title">

🏆 NEW HIGH SCORE

</div>





<input

value={name}

autoFocus

maxLength={12}

placeholder="ENTER NAME"

onChange={e=>setName(e.target.value)}

/>





<button

onClick={submit}

>

SAVE SCORE

</button>





</div>

}









{

!qualifies &&

<div className="no-score">

NO HIGH SCORE

</div>

}









{

submitted &&

<div className="saved">

✓ SCORE SAVED

</div>

}









<div className="game-over-buttons">



<button

onClick={onHighScores}

>

HIGH SCORES

</button>





<button

onClick={onRestart}

>

PLAY AGAIN

</button>





<button

onClick={onExit}

>

EXIT

</button>



</div>







</div>









<style jsx>{`

.game-over-overlay{

position:fixed;

inset:0;

z-index:3000;

background:rgba(0,0,0,.82);

display:flex;

justify-content:center;

align-items:flex-start;

padding:18px 8px;

font-family:monospace;

}



.game-over-panel{

width:min(94vw,390px);

max-height:90vh;

overflow-y:auto;

background:#111827;

border:3px solid #2979ff;

border-radius:14px;

padding:12px;

text-align:center;

box-shadow:0 0 35px #000;

}



h1{

margin:0;

font-size:clamp(28px,7vw,36px);

color:#ff1744;

text-shadow:2px 2px #000;

}



.score-title{

margin-top:4px;

font-weight:900;

color:#ffea00;

}



.score-number{

font-size:38px;

font-weight:900;

line-height:1;

color:#00e676;

}



.form-result{

margin-top:10px;

display:flex;

flex-direction:column;

align-items:center;

}



.image-holder{

width:110px;

height:110px;

display:flex;

align-items:center;

justify-content:center;

background:#222;

border:2px solid #00e676;

border-radius:10px;

}



.image-holder img{

width:100%;

height:100%;

object-fit:contain;

}



.form-name{

margin-top:5px;

font-size:20px;

font-weight:900;

color:white;

}



.category-label{

font-size:11px;

color:#888;

margin-top:3px;

}



.category{

font-size:16px;

font-weight:900;

color:#00e676;

}



.submit-box{

margin-top:10px;

padding:8px;

border:2px solid #ffea00;

border-radius:8px;

background:#050505;

}



.high-score-title{

font-weight:900;

color:#ffea00;

}



input{

width:90%;

margin-top:6px;

padding:6px;

font-family:monospace;

font-size:16px;

text-align:center;

}



button{

font-family:monospace;

font-weight:900;

cursor:pointer;

padding:7px 12px;

}



.submit-box button{

margin-top:6px;

}



.no-score{

margin-top:10px;

font-weight:900;

color:#ff1744;

}



.saved{

margin-top:10px;

font-weight:900;

color:#00e676;

}



.game-over-buttons{

display:flex;

justify-content:center;

gap:6px;

flex-wrap:wrap;

margin-top:12px;

}



@media(max-width:600px){

.game-over-panel{

width:96vw;

padding:10px;

}



.image-holder{

width:90px;

height:90px;

}

}

`}</style>



</div>

);

}