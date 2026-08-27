"use client";

import React from "react";

import RevealPanel from "./RevealPanel";

import {
  Form
} from "../../data/forms";


type Props = {

  reveal:number;

  currentForm:Form|null;

  formRevealed:boolean;

  frenzy:number;

};



export default function GamePanels({

  reveal,

  currentForm,

  formRevealed,

  frenzy

}:Props){



return (

<div

style={{

width:"100%",

display:"flex",

flexDirection:"column",

gap:8

}}

>



{

frenzy>0 &&

<div

style={{

background:

frenzy>=4

?

"#ff1744"

:

"#ffea00",

color:"#000",

border:"2px solid #fff",

borderRadius:8,

padding:"5px",

fontWeight:"900",

textAlign:"center",

fontSize:15

}}

>

{

frenzy>=4

?

"FINAL FORM FRENZY"

:

`FORM FRENZY ${frenzy}`

}

</div>

}





<div

style={{

background:"#101010",

border:"2px solid",

borderColor:

formRevealed

?

"#00e676"

:

"#555",

borderRadius:8,

padding:8,

fontFamily:"monospace",

textAlign:"center"

}}

>



<div

style={{

fontSize:10,

letterSpacing:1,

color:"#888"

}}

>

FORM DATABASE

</div>



<div

style={{

fontSize:18,

fontWeight:"900",

marginTop:3,

color:

formRevealed

?

"#00e676"

:

"#ffea00"

}}

>

{

formRevealed && currentForm

?

currentForm.name

:

"********"

}

</div>



<div

style={{

display:"flex",

justifyContent:"center",

alignItems:"center",

gap:5,

marginTop:3

}}

>

<span

style={{

fontSize:10,

color:"#777"

}}

>

CATEGORY

</span>



<strong

style={{

fontSize:13,

color:"#fff"

}}

>

{

formRevealed && currentForm

?

currentForm.category

:

"CLASSIFIED"

}

</strong>



</div>




{

!formRevealed &&

<div

style={{

marginTop:5,

fontSize:11,

padding:4,

background:"#222",

border:"1px dashed #666",

color:"#aaa"

}}

>

🔒 REDACTED FORM DATA

</div>

}




{

formRevealed &&

<div

style={{

marginTop:4,

fontSize:11,

fontWeight:"900",

color:"#00e676"

}}

>

✓ FORM VERIFIED

</div>

}



</div>





<RevealPanel

reveal={reveal}

form={currentForm}

formRevealed={formRevealed}

/>



</div>

);

}