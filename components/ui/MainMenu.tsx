"use client";

import React from "react";


type Props = {
  onStart:()=>void;
};


export default function MainMenu({

  onStart

}:Props){


return (

<div className="menu-container">


<h1>

FORM//DROP

</h1>



<div className="menu-panel">



<button

className="start"

onClick={onStart}

>

START GAME

</button>



</div>





<style jsx>{`

.menu-container{

min-height:100vh;

width:100%;

background:#050505;

color:#fff;

display:flex;

flex-direction:column;

align-items:center;

justify-content:center;

font-family:monospace;

padding:10px;

box-sizing:border-box;

}



h1{

font-size:clamp(36px,10vw,60px);

margin:0 0 35px;

letter-spacing:5px;

color:#ffea00;

font-weight:900;

text-shadow:

4px 4px #ff1744,

8px 8px #2979ff;

}



.menu-panel{

width:min(85vw,320px);

background:#111;

border:3px solid #ffea00;

border-radius:14px;

padding:18px;

box-shadow:0 0 35px #000;

}



button{

display:block;

width:100%;

padding:14px;

font-family:monospace;

font-size:20px;

font-weight:900;

letter-spacing:1px;

border:none;

border-radius:8px;

cursor:pointer;

background:#00e676;

color:#000;

}



button:hover{

transform:scale(1.03);

}



@media(max-width:600px){

h1{

font-size:34px;

margin-bottom:25px;

}



button{

font-size:18px;

padding:12px;

}



.menu-panel{

padding:14px;

}

}



`}</style>


</div>

);

}