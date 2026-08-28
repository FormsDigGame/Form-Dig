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



function handleStart(

e:React.TouchEvent

){

const touch=e.touches[0];

startX.current=touch.clientX;

startY.current=touch.clientY;

moved.current=false;

}



function handleEnd(

e:React.TouchEvent

){

const touch=e.changedTouches[0];



const deltaX =

touch.clientX - startX.current;



const deltaY =

touch.clientY - startY.current;



const distance =

Math.sqrt(

deltaX * deltaX +

deltaY * deltaY

);



if(distance < 20){

onRotate();

return;

}



if(Math.abs(deltaY) > Math.abs(deltaX)){


if(deltaY > 30){

onDropStart();


setTimeout(()=>{

onDropEnd();

},250);

}


return;

}



if(deltaX > 30){

onRight();

return;

}



if(deltaX < -30){

onLeft();

return;

}


}



return (

<div

className="mobile-touch-zone"

onTouchStart={handleStart}

onTouchEnd={handleEnd}

>


<style jsx>{`

.mobile-touch-zone {

position:absolute;

inset:0;

z-index:30;

touch-action:none;

user-select:none;

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