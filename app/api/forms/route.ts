import {
  NextResponse
} from "next/server";





/*

FORM COLLECTION API


Temporary server endpoint.

This is the only place that will know
where FORMS metadata comes from.


Later this will connect to:

- ord.net
- inscription metadata
- collection indexer
- cached database


The game receives only:

id
name
image


*/





export async function GET(){



try {



/*

PLACEHOLDER RESPONSE

Remove this once the real
collection endpoint is chosen.

*/



const forms = [



{

id:1,

name:"FORM #001",

image:""

}



];





return NextResponse.json(

forms

);



}

catch(error){



console.error(

"FORM API error:",

error

);



return NextResponse.json(

{

error:"Unable to load forms"

},

{

status:500

}

);



}



}