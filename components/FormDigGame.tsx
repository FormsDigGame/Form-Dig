"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";


import GameLayout from "./ui/GameLayout";


import {
  Form,
  getRandomForm
} from "../data/forms";


import {
  Cell,
  Piece,
  createBoard,
  createPiece,
  placePiece,
  applyGravity,
  findGroups,
  clearGroups,
  isGameOver,
  rotatePiece as rotateGamePiece,
  movePiece as moveGamePiece

} from "./game/gameLogic";


import {
  getClearScore,
  getDropScore,
  getRevealAmount,
  getChainText,
  getFrenzyMultiplier,
  getGravitySpeed,
  getFrenzyName

} from "./game/scoring";


import {
  saveHighScore,
  createHighScoreEntry,
  qualifiesForHighScore as checkHighScore

} from "../data/highScores";





export default function FormDigGame(){



const [board,setBoard] =

useState<Cell[][]>(

()=>createBoard()

);



const [piece,setPiece] =

useState<Piece|null>(null);



const [nextPiece,setNextPiece] =

useState<Piece|null>(null);



const [score,setScore] =

useState(0);



const [time,setTime] =

useState(0);



const [paused,setPaused] =

useState(false);



const [gameOver,setGameOver] =

useState(false);



const [softDrop,setSoftDrop] =

useState(false);



const [message,setMessage] =

useState("");



const [flash,setFlash] =

useState(false);



const [reveal,setReveal] =

useState(0);



const [formRevealed,setFormRevealed] =

useState(false);



const [revealBurst,setRevealBurst] =

useState(false);



const [currentForm,setCurrentForm] =

useState<Form|null>(null);



const [clearing,setClearing] =

useState<Set<string>>(

new Set()

);



const [frenzy,setFrenzy] =

useState(0);



const [frenzyActive,setFrenzyActive] =

useState(false);



const [shake,setShake] =

useState(false);



const [highScoreEligible,setHighScoreEligible] =

useState(false);



const [highScoreSubmitted,setHighScoreSubmitted] =

useState(false);



const [showScore,setShowScore] =

useState(false);



const [showHelp,setShowHelp] =

useState(false);



const [showHighScores,setShowHighScores] =

useState(false);



const [showMenu,setShowMenu] =

useState(true);



/* music controls */

const [musicMuted,setMusicMuted] =

useState(false);



const musicMutedRef =

useRef(false);



const musicPlayingRef =

useRef(false);



const pageVisibleRef =

useRef(true);



const dialogOpen =

showScore ||

showHelp ||

showHighScores;



const pieceRef =

useRef<Piece|null>(null);



const boardRef =

useRef<Cell[][]>(

createBoard()

);



const pausedRef =

useRef(false);



const gameOverRef =

useRef(false);



const softDropRef =

useRef(false);



const lastDrop =

useRef(0);



const frenzyRef =

useRef(0);



const frenzyTimerRef =

useRef<number[]>([]);



const musicRef =

useRef<HTMLAudioElement | null>(null);



useEffect(() => {
  const audio = new Audio("/audio/theme.mp3");

  audio.loop = true;
  audio.volume = 0.35;

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });

  musicRef.current = audio;

  return () => {
    audio.pause();
    audio.currentTime = 0;
    musicRef.current = null;
  };
}, []);



function playMusic(){

if(

musicRef.current &&

!musicMutedRef.current &&

pageVisibleRef.current &&

!pausedRef.current &&

!gameOverRef.current

){

musicRef.current.play().catch(()=>{});

musicPlayingRef.current=true;

}

}



function pauseMusic(){

if(musicRef.current){

musicRef.current.pause();

musicPlayingRef.current=false;

}

}



function toggleMusic(){

const next = !musicMutedRef.current;

musicMutedRef.current = next;

setMusicMuted(next);


if(next){

pauseMusic();

}

else{

playMusic();

}

}

useEffect(()=>{

pieceRef.current = piece;

},[piece]);





useEffect(()=>{

boardRef.current = board;

},[board]);





useEffect(()=>{

pausedRef.current = paused;

if(paused){

pauseMusic();

}

else{

playMusic();

}

},[paused]);





useEffect(()=>{

gameOverRef.current = gameOver;

if(gameOver){

pauseMusic();

}

},[gameOver]);





useEffect(()=>{

softDropRef.current = softDrop;

},[softDrop]);





useEffect(()=>{

frenzyRef.current = frenzy;

},[frenzy]);





useEffect(()=>{

const savedMute =

localStorage.getItem("formDigMusicMuted");


if(savedMute==="true"){

musicMutedRef.current=true;

setMusicMuted(true);

}


},[]);





useEffect(()=>{

localStorage.setItem(

"formDigMusicMuted",

String(musicMuted)

);


musicMutedRef.current = musicMuted;


if(musicMuted){

pauseMusic();

}

else{

playMusic();

}


},[musicMuted]);





useEffect(()=>{


function handleVisibility(){


const visible =

document.visibilityState==="visible";


pageVisibleRef.current = visible;



if(!visible){

pauseMusic();

return;

}



if(

!pausedRef.current &&

!gameOverRef.current &&

!showMenu

){

playMusic();

}



}



document.addEventListener(

"visibilitychange",

handleVisibility

);



return()=>{


document.removeEventListener(

"visibilitychange",

handleVisibility

);



};



},[showMenu]);





useEffect(()=>{


if(showMenu){

pauseMusic();

}



},[showMenu]);





useEffect(()=>{


if(dialogOpen){

pauseMusic();

}


},[dialogOpen]);





function updatePiece(

next:Piece

){


pieceRef.current = next;


setPiece(next);


}





function clearFrenzyTimers(){



frenzyTimerRef.current.forEach(

timer=>clearTimeout(timer)

);



frenzyTimerRef.current=[];



}





function stopFrenzy(){



setFrenzy(0);


frenzyRef.current=0;


setFrenzyActive(false);


setShake(false);


setFlash(false);



clearFrenzyTimers();



}





function endGame(){



stopFrenzy();


pauseMusic();


setGameOver(true);


gameOverRef.current=true;



checkHighScore(score)

.then(

result=>{


setHighScoreEligible(result);


}

);



}





function exitGame(){


pauseMusic();


if(musicRef.current){

musicRef.current.currentTime=0;

}


stopFrenzy();



setPaused(false);


setGameOver(false);



gameOverRef.current=false;


pausedRef.current=false;



setShowScore(false);


setShowHelp(false);


setShowHighScores(false);



setShowMenu(true);



}

function startFromMenu(){



setShowMenu(false);



startGame();



}





function triggerFrenzy(

level:number

){



if(gameOverRef.current){

return;

}





setFrenzy(level);


frenzyRef.current=level;



setFrenzyActive(true);


setShake(true);


setFlash(true);



setMessage(

getFrenzyName(level)

);






const duration =


level===1

?

3000

:

level===2

?

6000

:

level===3

?

12000

:

20000;







const timer = window.setTimeout(()=>{



if(level<4 && !gameOverRef.current){



setFrenzy(0);


frenzyRef.current=0;


setFrenzyActive(false);


setShake(false);


setFlash(false);


setMessage("");



}



},duration);



frenzyTimerRef.current.push(timer);



}









function checkFrenzyTime(

seconds:number

){



if(seconds===45){

triggerFrenzy(1);

}



if(seconds===90){

triggerFrenzy(2);

}



if(seconds===150){

triggerFrenzy(3);

}



if(seconds===225){

triggerFrenzy(4);

}



}










function startGame(){


playMusic();



clearFrenzyTimers();






const first=createPiece();


const next=createPiece();


const empty=createBoard();





setBoard(empty);


boardRef.current=empty;





setPiece(first);


pieceRef.current=first;





setNextPiece(next);






setScore(0);


setTime(0);


setReveal(0);


setFormRevealed(false);


setRevealBurst(false);





setCurrentForm(

getRandomForm()

);





setMessage("");





setFlash(false);


setShake(false);





setFrenzy(0);


frenzyRef.current=0;


setFrenzyActive(false);






setHighScoreEligible(false);


setHighScoreSubmitted(false);






setClearing(new Set());






setShowScore(false);


setShowHelp(false);


setShowHighScores(false);






setPaused(false);


setGameOver(false);






pausedRef.current=false;


gameOverRef.current=false;



}








function spawnNext(){



const next =

nextPiece || createPiece();





updatePiece(next);





setNextPiece(

createPiece()

);



}








function move(

dx:number

){



const current =

pieceRef.current;





if(

!current ||

pausedRef.current ||

gameOverRef.current

){

return;

}







const moved =

moveGamePiece(

boardRef.current,

current,

dx,

0

);





if(moved){



updatePiece(moved);



}



}








function rotate(){



const current =

pieceRef.current;





if(

!current ||

pausedRef.current ||

gameOverRef.current

){

return;

}







const rotated =

rotateGamePiece(

boardRef.current,

current

);





if(rotated){



updatePiece(rotated);



}



}








async function lockCurrentPiece(){



const current =

pieceRef.current;





if(!current){

return;

}






let working =

placePiece(

boardRef.current,

current

);





if(isGameOver(working)){



boardRef.current=working;


setBoard(working);



endGame();



return;



}






let removedTotal=0;


let chain=0;





while(true){



const groups =

findGroups(

working

);





if(groups.length===0){

break;

}





const allClearing =

new Set<string>();





groups.forEach(group=>{



group.forEach(cell=>{



allClearing.add(cell);



});



});





setClearing(allClearing);





await new Promise(

resolve=>

setTimeout(

resolve,

250

)

);





setClearing(new Set());





const result =

clearGroups(

working,

groups

);





working=result.board;





working=

applyGravity(

working

);





removedTotal +=

result.removed;



chain++;





}

boardRef.current=working;


setBoard(working);




let points=

getDropScore();





if(removedTotal>0){



const clearPoints=

getClearScore(

removedTotal,

chain

);





const multiplier=

getFrenzyMultiplier(

frenzyRef.current

);





points +=

Math.floor(

clearPoints *

multiplier

);





setScore(old=>

old+points

);





setReveal(old=>{



const amount=

getRevealAmount(

removedTotal,

chain

);





const next=

Math.min(

100,

old+amount

);





if(

next>=100 &&

!formRevealed

){



setFormRevealed(true);



setRevealBurst(true);



setMessage(

"FORM REVEALED!"

);





window.setTimeout(()=>{

setRevealBurst(false);

},800);



}



return next;



});





setMessage(

getChainText(chain)

||

`+${points}`

);





setFlash(true);





window.setTimeout(()=>{



if(!frenzyRef.current){



setFlash(false);



}



},250);



}

else{



setScore(old=>

old+points

);



}





if(isGameOver(working)){



endGame();



return;



}





spawnNext();



}










function tick(){



const current=

pieceRef.current;





if(

!current ||

pausedRef.current ||

gameOverRef.current

){

return;

}







const moved=

moveGamePiece(

boardRef.current,

current,

0,

1

);





if(moved){



updatePiece(moved);



}

else{



lockCurrentPiece();



}



}










function submitHighScore(

name:string

){



if(!currentForm){

return;

}





const entry=

createHighScoreEntry({



name,


score,


time,



formName:

currentForm.name,



formCategory:

currentForm.category,



formImage:

currentForm.image



});





saveHighScore(entry)

.then(()=>{


setHighScoreSubmitted(true);


});



}










useEffect(()=>{



let frame:number;





function loop(now:number){



if(

!pausedRef.current &&

!gameOverRef.current

){



let speed=

getGravitySpeed(

time,

frenzyRef.current

);





if(softDropRef.current){



speed=60;



}






if(

now-lastDrop.current >

speed

){



tick();



lastDrop.current=now;



}



}






frame=

requestAnimationFrame(

loop

);



}





frame=

requestAnimationFrame(

loop

);





return()=>{



cancelAnimationFrame(frame);



};



},[time]);










useEffect(()=>{



const timer=

window.setInterval(()=>{



if(

!pausedRef.current &&

!gameOverRef.current

){



setTime(old=>{



const next=

old+1;



checkFrenzyTime(next);



return next;



});



}



},1000);





return()=>{



clearInterval(timer);


clearFrenzyTimers();



};



},[]);










function handleKeyDown(

e:KeyboardEvent

){



if(

[

"ArrowLeft",

"ArrowRight",

"ArrowDown",

"ArrowUp",

" ",

"a",

"s",

"d",

"w",

"A",

"S",

"D",

"W"

].includes(e.key)

){



e.preventDefault();



}






if(e.key==="Escape"){



setPaused(old=>!old);


return;



}





if(

pausedRef.current ||

gameOverRef.current

){

return;

}





const key = e.key.toLowerCase();


if(
key==="arrowleft" ||
key==="a"
){

move(-1);

}


if(
key==="arrowright" ||
key==="d"
){

move(1);

}


if(
key==="arrowup" ||
key==="w" ||
e.code==="Space"
){

rotate();

}


if(
key==="arrowdown" ||
key==="s"
){

setSoftDrop(true);

}



}



function handleKeyUp(

e:KeyboardEvent

){

const key = e.key.toLowerCase();


if(
key==="arrowdown" ||
key==="s"
){

setSoftDrop(false);

}

}

useEffect(()=>{



window.addEventListener(

"keydown",

handleKeyDown

);





window.addEventListener(

"keyup",

handleKeyUp

);





return()=>{



window.removeEventListener(

"keydown",

handleKeyDown

);





window.removeEventListener(

"keyup",

handleKeyUp

);



};



});









return (



<GameLayout





board={board}





piece={piece}





nextPiece={nextPiece}







score={score}





time={time}





reveal={reveal}





currentForm={currentForm}







flash={flash}





clearing={clearing}







paused={paused}





gameOver={gameOver}





message={message}







frenzy={frenzy}





frenzyActive={frenzyActive}





shake={shake}





formRevealed={formRevealed}





revealBurst={revealBurst}







qualifies={highScoreEligible}





submitted={highScoreSubmitted}





onSubmitScore={submitHighScore}







onPause={()=>{



setPaused(true);



}}







onRestart={startGame}







onResume={()=>{



setPaused(false);



pausedRef.current=false;



}}







onMoveLeft={()=>{



move(-1);



}}







onMoveRight={()=>{



move(1);



}}







onRotate={rotate}







onDropStart={()=>{



setSoftDrop(true);



}}







onDropEnd={()=>{



setSoftDrop(false);



}}







onScore={()=>{



setPaused(true);



pausedRef.current=true;



setShowScore(true);



}}







onHelp={()=>{



setPaused(true);



pausedRef.current=true;



setShowHelp(true);



}}







onHighScores={()=>{



setPaused(true);



pausedRef.current=true;



setShowHighScores(true);



}}







onExit={exitGame}







showMenu={showMenu}







onStart={startFromMenu}







showScore={showScore}





showHelp={showHelp}





showHighScores={showHighScores}







closeScore={()=>{



setShowScore(false);



}}







closeHelp={()=>{



setShowHelp(false);



}}







closeHighScores={()=>{



setShowHighScores(false);



}}







/>



);



}