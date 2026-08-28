"use client";

import React, {
  useMemo
} from "react";

import {
  Form
} from "../../data/forms";


type Props = {

  reveal:number;

  form:Form|null;

  formRevealed?:boolean;

};



export default function RevealPanel({

  reveal,

  form,

  formRevealed=false

}:Props){



const pixels = useMemo(()=>{

return Array.from(

{length:100},

(_,index)=>({

id:index

})

);

},[]);



const percent=Math.floor(reveal);



return (

<div className="reveal-panel">



<div className="panel-title">

{

formRevealed

?

"FORM UNLOCKED"

:

"CLASSIFIED IMAGE"

}

</div>





<div className="image-box">


{

form &&

<img

src={form.image}

alt="hidden form"

className={

formRevealed

?

"form-image revealed"

:

"form-image"

}

/>

}



{

form && !formRevealed &&

<div className="pixel-cover">

{

pixels.map(pixel=>{


const removed =

reveal >

(pixel.id / pixels.length) * 100;



return (

<div

key={pixel.id}

className={

removed

?

"pixel removed"

:

"pixel"

}

/>

);


})

}

</div>

}



{

form && !formRevealed &&

<div className="locked-message">

<div>

🔒 LOCKED

</div>

<span>

REDACTED

</span>

</div>

}



{

!form &&

<div className="no-data">

NO FORM DATA

</div>

}


</div>





<div className="reveal-status">

{

formRevealed

?

"FORM REVEALED"

:

`${percent}% DECRYPTED`

}

</div>





<div className="progress">

<div

className="progress-fill"

style={{

width:`${reveal}%`

}}

/>

</div>





{

formRevealed && form &&

<div className="category-box">


<div className="category-label">

CATEGORY

</div>


<div className="category-value">

{form.category}

</div>


</div>

}





<style jsx>{`

.reveal-panel {

width:100%;

background:#101010;

border:2px solid #555;

border-radius:10px;

padding:8px;

font-family:monospace;

box-sizing:border-box;

}



.panel-title {

font-size:12px;

font-weight:900;

letter-spacing:2px;

text-align:center;

color:${formRevealed ? "#00e676" : "#aaa"};

margin-bottom:6px;

}



.image-box {

position:relative;

height:280px;

background:#050505;

border-radius:8px;

overflow:hidden;

border:2px solid #2979ff;

}



.form-image {

width:100%;

height:100%;

object-fit:contain;

padding:6px;

filter:

brightness(.55)

grayscale(.4);

transition:filter .5s ease;

}



.form-image.revealed {

filter:none;

}



.pixel-cover {

position:absolute;

inset:0;

display:grid;

grid-template-columns:repeat(10,1fr);

grid-template-rows:repeat(10,1fr);

}



.pixel {

background:#555;

border:

1px solid rgba(255,255,255,.08);

}



.pixel.removed {

background:transparent;

border:none;

}



.locked-message {

position:absolute;

inset:0;

display:flex;

align-items:center;

justify-content:center;

flex-direction:column;

pointer-events:none;

}



.locked-message div {

background:rgba(0,0,0,.75);

border:2px solid #ff1744;

padding:10px 16px;

font-weight:900;

font-size:16px;

}



.locked-message span {

margin-top:5px;

font-size:12px;

color:#aaa;

font-weight:900;

}



.no-data {

position:absolute;

inset:0;

display:flex;

align-items:center;

justify-content:center;

color:#777;

font-weight:900;

}



.reveal-status {

margin-top:7px;

text-align:center;

font-size:18px;

font-weight:900;

color:${formRevealed ? "#00e676" : "#ffea00"};

}



.progress {

height:9px;

margin-top:6px;

background:#333;

border-radius:10px;

overflow:hidden;

}



.progress-fill {

height:100%;

background:

linear-gradient(

90deg,

#777,

#2979ff,

#00e676

);

transition:width .3s ease;

}



.category-box {

margin-top:8px;

background:#0b0b0b;

border:1px solid #00e676;

border-radius:8px;

padding:6px;

text-align:center;

}



.category-label {

font-size:11px;

color:#888;

letter-spacing:2px;

}



.category-value {

font-size:18px;

font-weight:900;

color:#00e676;

}





@media(max-width:900px){

.image-box {

height:180px;

}

}



@media(max-width:600px){

.image-box {

height:135px;

}



.panel-title {

font-size:10px;

}



.reveal-status {

font-size:14px;

}



.progress {

height:7px;

}



.category-value {

font-size:14px;

}

}



`}</style>


</div>

);

}