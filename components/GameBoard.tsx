"use client";

import {
  Cell,
  Piece,
  getPositions,
  ROWS,
  COLS
} from "./game/gameLogic";


type Props = {

  board:Cell[][];

  current:Piece|null;

  flash:boolean;

  clearing:Set<string>;

};





export default function GameBoard({

  board,

  current,

  flash,

  clearing

}:Props){



function getCellColor(

  x:number,

  y:number

):Cell{


  let value =

    board[y][x];



  if(current){


    const positions =

      getPositions(current);



    positions.forEach(

      ([px,py],index)=>{


        if(

          px===x &&

          py===y

        ){


          value =

            index===0

            ?

            current.first

            :

            current.second;


        }


      }

    );

  }



  return value;

}






return (

<div

className="game-board"

style={{


display:"grid",



gridTemplateColumns:

`repeat(${COLS}, var(--cell-size))`,



gridTemplateRows:

`repeat(${ROWS}, var(--cell-size))`,



gap:"var(--cell-gap)",



padding:"var(--board-padding)",



background:"#050505",



border:

flash

?

"3px solid #ffd600"

:

"3px solid #333",



boxShadow:

flash

?

"0 0 25px #ffd600"

:

"none",



touchAction:"none"



}}

>



{

board.map(

(row,y)=>(

row.map(

(_,x)=>{


const color =

getCellColor(

x,

y

);



const isClearing =

clearing.has(

`${x},${y}`

);





return (

<div

key={`${x}-${y}`}

style={{


width:"var(--cell-size)",


height:"var(--cell-size)",



background:

color || "#111",



border:

"1px solid #222",



borderRadius:6,



boxSizing:"border-box",



animation:

isClearing

?

"clearPulse .45s infinite"

:

"none",



transition:

"transform .15s"



}}

/>


);


}

)

)

)

}



<style>

{`

.game-board {

--cell-size:36px;

--cell-gap:3px;

--board-padding:12px;

}



@media(max-width:600px){


.game-board {


--cell-size:27px;

--cell-gap:2px;

--board-padding:6px;


}


}



@media(max-width:380px){


.game-board {


--cell-size:24px;

--cell-gap:2px;

--board-padding:4px;


}


}



@keyframes clearPulse {


0%{

transform:scale(1);

filter:brightness(1);

box-shadow:0 0 0 transparent;

}



50%{

transform:scale(1.25);

filter:brightness(2.5);

box-shadow:0 0 20px white;

}



100%{

transform:scale(1);

filter:brightness(1);

box-shadow:0 0 0 transparent;

}



}


`}

</style>



</div>

);


}