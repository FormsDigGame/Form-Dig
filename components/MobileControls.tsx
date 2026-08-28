"use client";

import React, {
  useRef
} from "react";


type Props = {

  onLeft:()=>void;

  onRight:()=>void;

  onRotate:()=>void;

  onDropStart:()=>void;

  onDropEnd:()=>void;

};



export default function MobileControls({

  onLeft,

  onRight,

  onRotate,

  onDropStart,

  onDropEnd

}:Props){


const startX = useRef(0);

const startY = useRef(0);

const moved = useRef(false);

const dropping = useRef(false);



function start(e:React.TouchEvent){

e.preventDefault();

e.stopPropagation();


const touch=e.touches[0];

startX.current=touch.clientX;

startY.current=touch.clientY;

moved.current=false;

}



function move(e:React.TouchEvent){

e.preventDefault();

e.stopPropagation();


const touch=e.touches[0];


const x = touch.clientX - startX.current;

const y = touch.clientY - startY.current;



// prevent repeated triggers

if(moved.current){

return;

}



// horizontal movement

if(Math.abs(x) > Math.abs(y) && Math.abs(x) > 15){


moved.current=true;


if(x > 0){

onRight();

}

else{

onLeft();

}


return;

}



// downward soft drop

if(y > 20){

moved.current=true;

dropping.current=true;

onDropStart();

}

}



function end(e:React.TouchEvent){

e.preventDefault();

e.stopPropagation();


if(dropping.current){

onDropEnd();

dropping.current=false;

return;

}



if(!moved.current){

onRotate();

}


}



return (

<div

className="mobile-touch-zone"

onTouchStart={start}

onTouchMove={move}

onTouchEnd={end}

>


<style jsx>{`

.mobile-touch-zone {

position:absolute;

inset:0;

z-index:50;

touch-action:none;

user-select:none;

-webkit-user-select:none;

-webkit-touch-callout:none;

}



@media(min-width:901px){

.mobile-touch-zone {

display:none;

}

}

`}</style>


</div>

);

}