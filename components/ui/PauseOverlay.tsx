"use client";

import React from "react";


type Props = {

  onResume:()=>void;

  onScore:()=>void;

  onHelp:()=>void;

  onHighScores:()=>void;

};



export default function PauseOverlay({

  onResume,

  onScore,

  onHelp,

  onHighScores

}:Props){


return (

<div className="pause-overlay">


<div className="pause-panel">


<h2>

PAUSED

</h2>



<div className="pause-line">

SYSTEM HALTED

</div>



<p>

RESUME WHEN READY

</p>



<button

className="resume"

onClick={onResume}

>

RESUME

</button>



<button

onClick={onScore}

>

SCORING

</button>



<button

onClick={onHelp}

>

CONTROLS

</button>



<button

onClick={onHighScores}

>

HIGH SCORES

</button>



</div>





<style jsx>{`

.pause-overlay{

position:absolute;

inset:0;

z-index:2000;

background:rgba(0,0,0,.78);

display:flex;

align-items:center;

justify-content:center;

border-radius:10px;

font-family:monospace;

}



.pause-panel{

width:min(85vw,320px);

background:#111;

border:3px solid #ffea00;

border-radius:14px;

padding:18px;

text-align:center;

box-shadow:

0 0 35px #000,

0 0 15px #2979ff;

}



h2{

margin:0 0 8px;

font-size:32px;

font-weight:900;

letter-spacing:3px;

color:#ffea00;

text-shadow:

3px 3px #ff1744;

}



.pause-line{

font-size:14px;

font-weight:900;

color:#00e676;

margin-bottom:4px;

}



p{

margin:0 0 16px;

font-size:12px;

font-weight:900;

color:#aaa;

}



button{

display:block;

width:100%;

margin:8px 0;

padding:11px;

font-family:monospace;

font-size:16px;

font-weight:900;

letter-spacing:1px;

cursor:pointer;

border:none;

border-radius:8px;

background:#2979ff;

color:#fff;

}



button:hover{

transform:scale(1.03);

}



.resume{

background:#00e676;

color:#000;

}



@media(max-width:600px){


.pause-panel{

width:260px;

padding:14px;

}



h2{

font-size:26px;

}



button{

font-size:15px;

padding:10px;

}



}



`}</style>


</div>

);

}