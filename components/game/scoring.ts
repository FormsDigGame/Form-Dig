// FORM//DROP scoring system
// Balanced around:
// - strong chains: ~30 seconds reveal
// - average play: ~90 seconds reveal
// - basic connections: ~2:30 reveal
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
  
    Reveal balancing:

    Small clear:
    ~1-3%

    Medium clear:
    ~5-8%

    Strong chain:
    ~10-20%

    Large chain:
    explosive reveal

  */



  const blockReveal =

    removed * 0.45;



  const chainBonus =

    chain <= 1

      ? 0

      :

      Math.pow(chain,1.35) * 1.8;





  const largeClearBonus =

    removed >= 10

      ? 5

      :

      removed >= 20

      ? 10

      :

      0;





  return Math.min(

    25,

    blockReveal +

    chainBonus +

    largeClearBonus

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
// No hard cap.
// Final frenzy keeps accelerating.


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