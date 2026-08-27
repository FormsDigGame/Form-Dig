"use client";


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



return (

<div

style={{

display:"flex",

flexDirection:"column",

alignItems:"center",

gap:18,

marginTop:25,

touchAction:"none",

userSelect:"none"

}}

>




<button

onClick={onRotate}

style={buttonStyle}

>

↻

<br/>

ROTATE

</button>






<div

style={{

display:"flex",

gap:40

}}

>



<button

onClick={onLeft}

style={buttonStyle}

>

←

<br/>

LEFT

</button>




<button

onClick={onRight}

style={buttonStyle}

>

→

<br/>

RIGHT

</button>



</div>







<button

onPointerDown={onDropStart}

onPointerUp={onDropEnd}

onPointerLeave={onDropEnd}

style={{

...buttonStyle,

width:110

}}

>

↓

<br/>

DROP

</button>





</div>

);


}






const buttonStyle:React.CSSProperties={

width:90,

height:70,

fontSize:18,

fontWeight:"bold",

background:"#111",

color:"#fff",

border:"3px solid #444",

borderRadius:12,

cursor:"pointer",

touchAction:"none",

fontFamily:"monospace"

};