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

const lastMoveX = useRef(0);

const startTime = useRef(0);

const moved = useRef(false);

const dropping = useRef(false);



function touchStart(e:React.TouchEvent){

e.preventDefault();


const touch=e.touches[0];


startX.current=touch.clientX;

startY.current=touch.clientY;

lastMoveX.current=touch.clientX;

startTime.current=Date.now();

moved.current=false;


}



function touchMove(e:React.TouchEvent){

e.preventDefault();


const touch=e.touches[0];


const deltaX =
touch.clientX - startX.current;


const deltaY =
touch.clientY - startY.current;



// soft drop

if(deltaY > 30 && !dropping.current){

dropping.current=true;

onDropStart();

return;

}



// horizontal swipe movement

const stepDistance=25;


const movement =
touch.clientX - lastMoveX.current;



if(Math.abs(movement) >= stepDistance){


const amount =
Math.floor(Math.abs(deltaX) / stepDistance);



if(movement > 0){

for(let i=0;i<amount;i++){

onRight();

}

}

else{

for(let i=0;i<amount;i++){

onLeft();

}

}


lastMoveX.current=touch.clientX;

moved.current=true;

}


}



function touchEnd(e:React.TouchEvent){

e.preventDefault();


if(dropping.current){

onDropEnd();

dropping.current=false;

return;

}



const duration =
Date.now()-startTime.current;


const movedDistance =
Math.abs(startX.current-lastMoveX.current);



if(!moved.current && duration < 250 && movedDistance < 15){

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

z-index:100;

touch-action:none;

user-select:none;

-webkit-user-select:none;

-webkit-touch-callout:none;

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