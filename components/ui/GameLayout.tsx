"use client";

import React from "react";

import GameBoard from "../GameBoard";
import MobileControls from "../MobileControls";

import MainMenu from "./MainMenu";
import TopBar from "./TopBar";
import GamePanels from "./GamePanels";
import NextPiecePanel from "./NextPiecePanel";

import PauseOverlay from "./PauseOverlay";
import GameOverOverlay from "./GameOverOverlay";
import ScoreDialog from "./ScoreDialog";

import {
  Cell,
  Piece
} from "../game/gameLogic";

import {
  Form
} from "../../data/forms";


type Props = {

  board:Cell[][];

  piece:Piece|null;

  nextPiece:Piece|null;

  score:number;

  time:number;

  reveal:number;

  currentForm:Form|null;

  flash:boolean;

  clearing:Set<string>;

  paused:boolean;

  gameOver:boolean;

  message:string;

  frenzy:number;

  frenzyActive:boolean;

  shake:boolean;

  formRevealed:boolean;

  revealBurst:boolean;

  qualifies:boolean;

  submitted:boolean;

  onSubmitScore:(name:string)=>void;

  onPause:()=>void;

  onRestart:()=>void;

  onResume:()=>void;

  onMoveLeft:()=>void;

  onMoveRight:()=>void;

  onRotate:()=>void;

  onDropStart:()=>void;

  onDropEnd:()=>void;

  onScore:()=>void;

  onHelp:()=>void;

  onHighScores:()=>void;

  showScore:boolean;

  showHelp:boolean;

  showHighScores:boolean;

  closeScore:()=>void;

  closeHelp:()=>void;

  closeHighScores:()=>void;

  onExit:()=>void;

  showMenu:boolean;

  onStart:()=>void;

};





export default function GameLayout({

  board,

  piece,

  nextPiece,

  score,

  time,

  reveal,

  currentForm,

  flash,

  clearing,

  paused,

  gameOver,

  message,

  frenzy,

  frenzyActive,

  shake,

  formRevealed,

  revealBurst,

  qualifies,

  submitted,

  onSubmitScore,

  onPause,

  onRestart,

  onResume,

  onMoveLeft,

  onMoveRight,

  onRotate,

  onDropStart,

  onDropEnd,

  onScore,

  onHelp,

  onHighScores,

  showScore,

  showHelp,

  showHighScores,

  closeScore,

  closeHelp,

  closeHighScores,

  onExit,

  showMenu,

  onStart

}:Props){


const modalOpen =

showScore ||

showHelp ||

showHighScores;



return (

<div className="game-container">


{
!modalOpen &&

<MobileControls

onLeft={onMoveLeft}

onRight={onMoveRight}

onRotate={onRotate}

onDropStart={onDropStart}

onDropEnd={onDropEnd}

/>

}



{
showMenu &&

<MainMenu

onStart={onStart}

/>

}



{
!showMenu &&

<>

{
frenzyActive &&

<div className="frenzy-banner">

{

frenzy >= 4

?

"FINAL FORM FRENZY"

:

`FORM FRENZY ${frenzy}`

}

</div>

}



{
revealBurst &&

<div className="reveal-banner">

FORM REVEALED!

</div>

}



<h1>

FORM//DROP

</h1>



<TopBar

onPause={onPause}

onRestart={onRestart}

onHelp={onHelp}

onScore={onScore}

onHighScores={onHighScores}

/>



<div className="game-layout">


<div className="play-column">


<div className="top-game-info">


<div className="stat-box">

<span>

SCORE

</span>

<strong>

{score}

</strong>

</div>



<div className="next-box">

<NextPiecePanel

nextPiece={nextPiece}

/>

</div>



<div className="stat-box">

<span>

TIME

</span>

<strong>

{time}s

</strong>

</div>


</div>

<GameBoard

board={board}

current={piece}

flash={flash}

clearing={clearing}

/>



{
message &&

<div className="game-message">

{message}

</div>

}



</div>



<div className="form-column desktop-form">


<GamePanels

reveal={reveal}

currentForm={currentForm}

formRevealed={formRevealed}

frenzy={frenzy}

/>


</div>



<div className="mobile-form">


<GamePanels

reveal={reveal}

currentForm={currentForm}

formRevealed={formRevealed}

frenzy={frenzy}

/>


</div>



</div>





{
paused && !gameOver && !modalOpen &&

<PauseOverlay

onResume={onResume}

onScore={onScore}

onHelp={onHelp}

onHighScores={onHighScores}

/>

}





{
gameOver &&

<GameOverOverlay

score={score}

form={currentForm}

qualifies={qualifies}

submitted={submitted}

onSubmitScore={onSubmitScore}

onRestart={onRestart}

onHighScores={onHighScores}

onExit={onExit}

/>

}





{
showScore &&

<ScoreDialog

title="SCORING"

onClose={closeScore}

/>

}





{
showHelp &&

<ScoreDialog

title="CONTROLS"

onClose={closeHelp}

/>

}





{
showHighScores &&

<ScoreDialog

title="HIGH SCORES"

onClose={closeHighScores}

/>

}



</>

}



<style jsx>{`

.game-container {

min-height:100vh;

width:100%;

background:#050505;

color:#fff;

font-family:monospace;

display:flex;

flex-direction:column;

align-items:center;

padding:6px;

box-sizing:border-box;

overflow-x:hidden;

position:relative;

}



h1 {

font-size:clamp(42px,8vw,72px);

margin:0 0 12px;

letter-spacing:5px;

color:#ffea00;

font-weight:900;

text-shadow:

4px 4px #ff1744,

8px 8px #2979ff;

}



.game-layout {

width:100%;

max-width:950px;

display:flex;

justify-content:center;

align-items:flex-start;

gap:12px;

}



.play-column {

display:flex;

flex-direction:column;

align-items:center;

}



.top-game-info {

display:grid;

grid-template-columns:90px 120px 90px;

align-items:center;

justify-content:center;

gap:10px;

margin-bottom:8px;

}



.stat-box {

height:48px;

background:#111;

border:2px solid #444;

border-radius:8px;

display:flex;

flex-direction:column;

align-items:center;

justify-content:center;

}



.stat-box span {

font-size:9px;

font-weight:900;

color:#888;

}



.stat-box strong {

font-size:15px;

font-weight:900;

color:#ffea00;

}



.next-box {

width:120px;

height:72px;

display:flex;

align-items:center;

justify-content:center;

}



.form-column {

width:270px;

display:flex;

flex-direction:column;

}



.mobile-form {

display:none;

}



.game-message {

font-size:clamp(16px,4vw,22px);

font-weight:900;

color:#ffea00;

text-align:center;

min-height:22px;

}



.frenzy-banner {

position:fixed;

top:10%;

left:0;

right:0;

z-index:500;

text-align:center;

font-size:clamp(34px,8vw,60px);

font-weight:900;

color:#ffea00;

text-shadow:

5px 5px #000,

10px 10px #2979ff;

animation:frenzyPulse .25s infinite;

pointer-events:none;

}



.reveal-banner {

position:fixed;

inset:0;

z-index:600;

display:flex;

justify-content:center;

align-items:center;

font-size:clamp(38px,10vw,70px);

font-weight:900;

color:#00e676;

text-shadow:

6px 6px #000,

12px 12px #2979ff;

pointer-events:none;

animation:revealExplosion .8s ease;

}



@keyframes frenzyPulse {

0% {

transform:scale(1);

}

50% {

transform:scale(1.12);

}

100% {

transform:scale(1);

}

}



@keyframes revealExplosion {

0% {

transform:scale(.4);

opacity:0;

}

40% {

transform:scale(1.2);

opacity:1;

}

100% {

transform:scale(1);

opacity:0;

}



}

@media(max-width:900px){

.game-layout {

flex-direction:row;

align-items:flex-start;

justify-content:flex-start;

gap:6px;

width:100%;

max-width:100%;

padding-left:0;

box-sizing:border-box;

}



.play-column {

order:1;

width:auto;

max-width:calc(100vw - 140px);

flex-shrink:1;

transform:none;

margin-right:0;

}



.desktop-form {

display:none;

}



.mobile-form {

display:flex;

order:2;

width:120px;

max-width:120px;

min-width:120px;

flex-shrink:0;

margin-left:0;

}



.top-game-info {

grid-template-columns:65px 85px 65px;

gap:4px;

}



.next-box {

width:85px;

height:58px;

}

}





@media(max-width:600px){

.game-container {

min-height:100dvh;

height:auto;

padding:3px;

overflow-x:hidden;

overflow-y:auto;

}



h1 {

font-size:30px;

margin:0 0 3px;

letter-spacing:3px;

}



.game-layout {

display:flex;

flex-direction:row;

align-items:flex-start;

justify-content:flex-start;

gap:3px;

width:100%;

max-width:100%;

overflow:hidden;

box-sizing:border-box;

}



.play-column {

width:auto;

max-width:calc(100vw - 120px);

min-width:0;

transform:none;

margin-right:0;

}



.mobile-form {

width:105px;

max-width:105px;

min-width:105px;

}



.top-game-info {

grid-template-columns:50px 68px 50px;

gap:2px;

margin-bottom:4px;

}



.stat-box {

height:34px;

border-radius:6px;

}



.stat-box span {

font-size:8px;

}



.stat-box strong {

font-size:12px;

}



.next-box {

width:68px;

height:46px;

}



.game-message {

font-size:13px;

min-height:16px;

}

}





@media(max-width:380px){

h1 {

font-size:26px;

}



.game-layout {

gap:2px;

}



.play-column {

max-width:calc(100vw - 108px);

}



.mobile-form {

width:95px;

max-width:95px;

min-width:95px;

}



}

`}</style>


</div>

);

}