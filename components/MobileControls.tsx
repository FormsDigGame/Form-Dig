"use client";

import React, {
  useEffect,
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


const startX=useRef(0);

const startY=useRef(0);

const lastX=useRef(0);

const startTime=useRef(0);

const moved=useRef(false);

const dropping=useRef(false);

const active=useRef(false);



useEffect(()=>{


const isInteractive=(

target:EventTarget|null

)=>{

if(!(target instanceof HTMLElement)){

return false;

}


return Boolean(

target.closest(

"button, input, textarea, select, a, [role='button']"

)

);

};



const handleStart=(

e:TouchEvent

)=>{


if(isInteractive(e.target)){

active.current=false;

return;

}


if(e.touches.length!==1){

active.current=false;

return;

}


const touch=e.touches[0];


startX.current=touch.clientX;

startY.current=touch.clientY;

lastX.current=touch.clientX;

startTime.current=Date.now();

moved.current=false;

dropping.current=false;

active.current=true;


};



const handleMove=(

e:TouchEvent

)=>{


if(!active.current){

return;

}


if(e.touches.length!==1){

return;

}


e.preventDefault();


const touch=e.touches[0];


const deltaX=

touch.clientX-startX.current;


const deltaY=

touch.clientY-startY.current;



if(

deltaY>30 &&

Math.abs(deltaY)>Math.abs(deltaX)

){


if(!dropping.current){

dropping.current=true;

onDropStart();

}


return;

}



if(dropping.current){

return;

}



const movement=

touch.clientX-lastX.current;


const stepDistance=18;



if(Math.abs(movement)>=stepDistance){


const steps=

Math.floor(

Math.abs(movement)/stepDistance

);



if(movement>0){


for(

let i=0;

i<steps;

i++

){

onRight();

}


}

else{


for(

let i=0;

i<steps;

i++

){

onLeft();

}


}



lastX.current=touch.clientX;

moved.current=true;

}


};



const handleEnd=(

e:TouchEvent

)=>{


if(!active.current){

return;

}


if(dropping.current){

onDropEnd();

dropping.current=false;

active.current=false;

return;

}



const touch=e.changedTouches[0];


if(!touch){

active.current=false;

return;

}



const duration=

Date.now()-startTime.current;


const distanceX=

Math.abs(

touch.clientX-startX.current

);


const distanceY=

Math.abs(

touch.clientY-startY.current

);



if(

!moved.current &&

duration<300 &&

distanceX<15 &&

distanceY<15

){

onRotate();

}



active.current=false;

};



const handleCancel=()=>{


if(dropping.current){

onDropEnd();

}


dropping.current=false;

active.current=false;

};



window.addEventListener(

"touchstart",

handleStart,

{passive:true}

);


window.addEventListener(

"touchmove",

handleMove,

{passive:false}

);


window.addEventListener(

"touchend",

handleEnd,

{passive:true}

);


window.addEventListener(

"touchcancel",

handleCancel,

{passive:true}

);



return()=>{


window.removeEventListener(

"touchstart",

handleStart

);


window.removeEventListener(

"touchmove",

handleMove

);


window.removeEventListener(

"touchend",

handleEnd

);


window.removeEventListener(

"touchcancel",

handleCancel

);

};


},[

onLeft,

onRight,

onRotate,

onDropStart,

onDropEnd

]);



return null;

}