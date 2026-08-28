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


const startX=useRef(0);

const startY=useRef(0);

const lastX=useRef(0);

const startTime=useRef(0);

const moved=useRef(false);

const dropping=useRef(false);



function isInteractiveElement(

target:EventTarget|null

){

if(!(target instanceof HTMLElement)){

return false;

}


return Boolean(

target.closest(

"button, input, textarea, select, a, [role='button']"

)

);

}



function touchStart(

e:React.TouchEvent

){

if(isInteractiveElement(e.target)){

return;

}


e.preventDefault();


const touch=e.touches[0];


startX.current=touch.clientX;

startY.current=touch.clientY;

lastX.current=touch.clientX;

startTime.current=Date.now();

moved.current=false;

dropping.current=false;

}



function touchMove(

e:React.TouchEvent

){

if(isInteractiveElement(e.target)){

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

Math.abs(deltaY)>Math.abs(deltaX) &&

!dropping.current

){

dropping.current=true;

onDropStart();

return;

}



if(dropping.current){

return;

}



const movement=

touch.clientX-lastX.current;



const stepDistance=22;


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

}



function touchEnd(

e:React.TouchEvent

){

if(isInteractiveElement(e.target)){

return;

}


e.preventDefault();


if(dropping.current){

onDropEnd();

dropping.current=false;

return;

}


const duration=

Date.now()-startTime.current;


const totalX=

Math.abs(

e.changedTouches[0].clientX-

startX.current

);


const totalY=

Math.abs(

e.changedTouches[0].clientY-

startY.current

);


if(

!moved.current &&

duration<300 &&

totalX<15 &&

totalY<15

){

onRotate();

}

}



return (

<div

className="mobile-touch-layer"

onTouchStart={touchStart}

onTouchMove={touchMove}

onTouchEnd={touchEnd}

>


<style jsx>{`

.mobile-touch-layer {

position:fixed;

inset:0;

z-index:10;

touch-action:none;

user-select:none;

-webkit-user-select:none;

-webkit-touch-callout:none;

pointer-events:auto;

}



@media(min-width:901px){

.mobile-touch-layer{

display:none;

}

}

`}</style>


</div>

);

}