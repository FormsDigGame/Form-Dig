"use client";

import React from "react";

import {
  Piece
} from "../game/gameLogic";


type Props = {

  nextPiece:Piece|null;

};


export default function NextPiecePanel({

  nextPiece

}:Props){


return (

<div

style={{

background:"#111",

border:"2px solid #2979ff",

borderRadius:8,

padding:8,

width:95,

textAlign:"center",

fontFamily:"monospace"

}}

>


<div

style={{

color:"#ffea00",

fontSize:14,

fontWeight:"bold",

marginBottom:6

}}

>

NEXT

</div>



{

nextPiece &&

<div

style={{

display:"flex",

justifyContent:"center",

gap:4

}}

>

<div

style={{

width:25,

height:25,

background:nextPiece.first,

borderRadius:4

}}

/>


<div

style={{

width:25,

height:25,

background:nextPiece.second,

borderRadius:4

}}

/>

</div>

}


</div>

);

}