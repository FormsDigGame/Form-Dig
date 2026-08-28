// FORM//DROP scoring system
// Balanced around:
// - normal clears reveal around 90-120 seconds
// - strong play reveals faster
// - chains accelerate but are not required
// - reveal is a milestone, not the end of the game


export function getDropScore(){

  return 5;

}





export function getClearScore(

  removed:number,

  chain:number

){

  if(removed <= 0){

    return 0;

  }



  const base = removed * 25;



  const chainMultiplier =

    chain <= 1

      ? 1

      : 1 + ((chain - 1) * 0.75);



  return Math.floor(

    base * chainMultiplier

  );

}









export function getRevealAmount(

  removed:number,

  chain:number

){

  if(removed <= 0){

    return 0;

  }



  /*
  
    Reveal pacing:

    4 block clear:
    ~5%


    5 block clear:
    ~6%


    Larger clears:
    stronger reward


    Chains:
    bonus only, not required

  */



  const blockReveal =

    removed * 1.25;



  const chainBonus =

    chain <= 1

      ? 0

      :

      Math.pow(chain,1.25) * 3;



  const matchBonus =

    removed >= 12

      ? 8

      :

      removed >= 8

      ? 5

      :

      0;



  return Math.min(

    25,

    blockReveal +

    chainBonus +

    matchBonus

  );

}









export function getChainText(

  chain:number

){



  if(chain <= 1){

    return "";

  }



  if(chain === 2){

    return "FORM LINK!";

  }



  if(chain === 3){

    return "FORM CHAIN!";

  }



  if(chain === 4){

    return "FORM OVERDRIVE!";

  }



  if(chain === 5){

    return "FORM BREAKER!";

  }



  return "ULTIMATE FORM CHAIN!";

}











// Score multiplier during FORM FRENZY

export function getFrenzyMultiplier(

  frenzy:number

){

  switch(frenzy){


    case 1:

      return 1.15;


    case 2:

      return 1.35;


    case 3:

      return 1.6;


    case 4:

      return 2;



    default:

      return 1;

  }

}











// Gravity progression

export function getGravitySpeed(

  time:number,

  frenzy:number

){



  let speed =

    700 -

    (time * 2.2);





  if(frenzy === 1){

    speed -= 100;

  }



  if(frenzy === 2){

    speed -= 180;

  }



  if(frenzy === 3){

    speed -= 280;

  }



  if(frenzy >= 4){

    speed -= 400;

  }





  return Math.max(

    80,

    speed

  );

}









export function getFrenzyName(

  frenzy:number

){



  switch(frenzy){


    case 1:

      return "FORM FRENZY";


    case 2:

      return "FORM FRENZY II";


    case 3:

      return "FORM FRENZY III";


    case 4:

      return "FINAL FORM FRENZY";



    default:

      return "";

  }

}