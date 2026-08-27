import fs from "fs";
import path from "path";

console.log("FORM UPDATE SCRIPT RUNNING");


type Form = {

  id:string;

  name:string;

  image:string;

};





const COLLECTION_PARENT =
"040cf1b0187ee153260f6cfbdf820deb19a316f488fcc960dd3443a886df998ci0";





async function updateForms(){


  console.log(
    "Loading FORMS collection..."
  );



  const response = await fetch(

    "https://ord.net/collection/forms/__data.json"

  );



  if(!response.ok){

    throw new Error(

      `ORD request failed: ${response.status}`

    );

  }





  const raw = await response.text();




  console.log(

    "Downloaded characters:",

    raw.length

  );






  const matches =

    raw.match(

      /[a-f0-9]{64}i\d+/g

    ) || [];





  const ids = [

    ...new Set(matches)

  ]

  .filter(

    id =>

      id !== COLLECTION_PARENT

  );






  console.log(

    "Playable FORMS found:",

    ids.length

  );






  const forms:Form[] = ids.map(

    (id,index)=>(

      {

        id,

        name:

          `FORM ${index + 1}`,

        image:

          `https://render.ord.net/v7/snapshots/${id}/512.webp`

      }

    )

  );







  const output = path.join(

    process.cwd(),

    "data",

    "forms.json"

  );







  fs.writeFileSync(

    output,

    JSON.stringify(

      forms,

      null,

      2

    ),

    "utf8"

  );







  console.log(

    `Saved ${forms.length} FORMS`

  );



}





updateForms()

.catch(

  error=>{

    console.error(

      error

    );

    process.exit(1);

  }

);