export type HighScoreEntry = {

  id:string;

  name:string;

  score:number;

  time:number;

  formName:string;

  formCategory:string;

  formImage:string;

  createdAt:number;

};





const STORAGE_KEY =

"form_drop_high_scores";







export function getHighScores():HighScoreEntry[]{


  if(

    typeof window === "undefined"

  ){

    return [];

  }





  const saved =

    localStorage.getItem(

      STORAGE_KEY

    );





  if(

    !saved

  ){

    return [];

  }





  try{


    const parsed = JSON.parse(saved);



    if(

      Array.isArray(parsed)

    ){

      return parsed;

    }



    return [];



  }

  catch{


    return [];

  }



}









export function saveHighScore(

  entry:HighScoreEntry

){



  const scores =

    getHighScores();





  scores.push(entry);





  scores.sort(

    (a,b)=>

      b.score -

      a.score

  );





  const topScores =

    scores.slice(

      0,

      10

    );





  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(topScores)

  );



}









export function qualifiesForHighScore(

  score:number

){



  const scores =

    getHighScores();





  if(

    scores.length < 10

  ){

    return true;

  }





  return (

    score >

    scores[

      scores.length - 1

    ].score

  );



}









export function createHighScoreEntry(

data:{

  name:string;

  score:number;

  time:number;

  formName:string;

  formCategory:string;

  formImage:string;

}

):HighScoreEntry{





return {



  id:

  crypto.randomUUID(),



  name:

  data.name.trim(),



  score:

  data.score,



  time:

  data.time,



  formName:

  data.formName,



  formCategory:

  data.formCategory,



  formImage:

  data.formImage,



  createdAt:

  Date.now()



};



}









export function clearHighScores(){


  if(

    typeof window === "undefined"

  ){

    return;

  }





  localStorage.removeItem(

    STORAGE_KEY

  );


}