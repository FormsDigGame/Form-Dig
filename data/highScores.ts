import { supabase } from "../lib/supabase";


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





function mapRowToEntry(

  row:any

):HighScoreEntry{


  return {

    id:String(row.id),

    name:row.name,

    score:row.score,

    time:row.time,

    formName:row.form_name,

    formCategory:row.form_category,

    formImage:row.form_image,

    createdAt:new Date(
      row.created_at
    ).getTime()

  };


}







export async function getHighScores():Promise<HighScoreEntry[]>{


  const {

    data,

    error

  } = await supabase

    .from("high_scores")

    .select("*")

    .order(

      "score",

      {

        ascending:false

      }

    )

    .limit(10);





  if(error){


    console.error(

      "LOAD HIGH SCORES ERROR",

      {

        message:error.message,

        details:error.details,

        hint:error.hint,

        code:error.code

      }

    );


    return [];


  }





  return (

    data || []

  )

  .map(

    mapRowToEntry

  );


}









export async function saveHighScore(

  entry:HighScoreEntry

){



  const {

    error

  } = await supabase

    .from("high_scores")

    .insert({


      name:entry.name,


      score:entry.score,


      time:entry.time,


      form_name:entry.formName,


      form_category:entry.formCategory,


      form_image:entry.formImage,


      created_at:

        new Date(

          entry.createdAt

        ).toISOString()


    });






  if(error){


    console.error(

      "SAVE HIGH SCORE ERROR",

      {

        message:error.message,

        details:error.details,

        hint:error.hint,

        code:error.code

      }

    );


    return false;


  }



  return true;


}









export async function qualifiesForHighScore(

  score:number

):Promise<boolean>{



  const scores =

    await getHighScores();





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









export async function clearHighScores(){



  const {

    error

  } = await supabase

    .from("high_scores")

    .delete()

    .neq(

      "id",

      0

    );






  if(error){


    console.error(

      "CLEAR HIGH SCORES ERROR",

      {

        message:error.message,

        details:error.details,

        hint:error.hint,

        code:error.code

      }

    );


  }


}