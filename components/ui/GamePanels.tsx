"use client";

import React from "react";

import RevealPanel from "./RevealPanel";

import {
  Form
} from "../../data/forms";


type Props = {

  reveal:number;

  currentForm:Form|null;

  formRevealed:boolean;

  frenzy:number;

};




export default function GamePanels({

  reveal,

  currentForm,

  formRevealed,

  frenzy

}:Props){



return (

<div

className="game-panels"

>


{

frenzy>0 &&

<div className="frenzy-box">

{

frenzy>=4

?

"FINAL FORM FRENZY"

:

`FORM FRENZY ${frenzy}`

}

</div>

}





<div className="form-box">


<div className="panel-label">

FORMS DATABASE

</div>





<div className={

formRevealed

?

"form-name unlocked"

:

"form-name"

}>


{

formRevealed && currentForm

?

currentForm.name

:

"********"

}


</div>





<div className="category-row">


<span>

CATEGORY

</span>



<strong>

{

formRevealed && currentForm

?

currentForm.category

:

"CLASSIFIED"

}

</strong>



</div>





{

!formRevealed &&

<div className="locked">

CLASSIFIED

</div>

}





{

formRevealed &&

<div className="verified">

✓ FORM VERIFIED

</div>

}



</div>





<RevealPanel

reveal={reveal}

form={currentForm}

formRevealed={formRevealed}

/>





<style jsx>{`

.game-panels {

width:100%;

display:flex;

flex-direction:column;

gap:8px;

position:relative;

}



.frenzy-box {

position:absolute;

top:-42px;

left:0;

right:0;

background:#ffea00;

color:#000;

border:2px solid #fff;

border-radius:8px;

padding:5px;

font-weight:900;

text-align:center;

font-size:15px;

z-index:5;

}



.form-box {

background:#101010;

border:2px solid #555;

border-radius:8px;

padding:8px;

font-family:monospace;

text-align:center;

}



.panel-label {

font-size:10px;

letter-spacing:2px;

color:#888;

}



.form-name {

font-size:18px;

font-weight:900;

margin-top:4px;

color:#ffea00;

letter-spacing:1px;

}



.form-name.unlocked {

color:#00e676;

}



.category-row {

display:flex;

justify-content:center;

align-items:center;

gap:8px;

margin-top:5px;

font-size:12px;

}



.category-row span {

color:#777;

}



.category-row strong {

color:#fff;

font-size:11px;

max-width:100%;

overflow:hidden;

text-overflow:ellipsis;

white-space:nowrap;

}



.locked {

margin-top:8px;

padding:4px;

font-size:10px;

font-weight:900;

letter-spacing:3px;

color:#ff1744;

border-top:1px solid #444;

text-align:center;

}



.verified {

margin-top:5px;

color:#00e676;

font-size:12px;

font-weight:900;

}





@media(max-width:900px){


.game-panels {

max-width:380px;

margin:auto;

}


}





@media(max-width:600px){


.game-panels {

gap:4px;

}



.form-box {

padding:5px;

}



.form-name {

font-size:15px;

}



.category-row {

font-size:9px;

gap:4px;

}



.category-row strong {

font-size:10px;

}



.frenzy-box {

font-size:12px;

top:-34px;

}



.locked {

font-size:9px;

letter-spacing:2px;

}



}



`}</style>


</div>

);

}