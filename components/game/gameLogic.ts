export type Color =
  | "#ff1744"
  | "#2979ff"
  | "#00e676"
  | "#ffea00"
  | "#aa00ff";


export type Cell = Color | null;


export type Piece = {

  x:number;

  y:number;

  rotation:number;

  first:Color;

  second:Color;

};



export const ROWS = 14;

export const COLS = 8;



const colors:Color[]=[

  "#ff1744",
  "#2979ff",
  "#00e676",
  "#ffea00",
  "#aa00ff"

];





export function createBoard():Cell[][]{


  return Array.from(

    {length:ROWS},

    ()=>Array(COLS).fill(null)

  );


}








export function createPiece():Piece{


  return {


    /*
      x/y is the first blob position.

      The second blob rotates around
      the first blob.

      0:

      first
      second


      1:

      first second


      2:

      second
      first


      3:

      second first

    */


    x:

      Math.floor(COLS/2),


    y:

      1,


    rotation:

      0,


    first:

      colors[

        Math.floor(

          Math.random()*colors.length

        )

      ],


    second:

      colors[

        Math.floor(

          Math.random()*colors.length

        )

      ]


  };


}








function getSecondOffset(

  rotation:number

):number[]{


  switch(rotation % 4){


    case 0:

      return [

        0,

        1

      ];



    case 1:

      return [

        1,

        0

      ];



    case 2:

      return [

        0,

        -1

      ];



    default:

      return [

        -1,

        0

      ];


  }


}

export function getPositions(

  piece:Piece

):number[][]{


  const [

    ox,

    oy

  ] = getSecondOffset(

    piece.rotation

  );



  return [

    [

      piece.x,

      piece.y

    ],

    [

      piece.x + ox,

      piece.y + oy

    ]

  ];

}









export function canPlace(

  board:Cell[][],

  piece:Piece

):boolean{


  return getPositions(piece)

  .every(([x,y])=>{


    return (

      x>=0 &&

      x<COLS &&

      y>=0 &&

      y<ROWS &&

      board[y][x]===null

    );


  });


}









export function movePiece(

  board:Cell[][],

  piece:Piece,

  dx:number,

  dy:number

):Piece|null{


  const moved:Piece={


    ...piece,


    x:

      piece.x+dx,


    y:

      piece.y+dy



  };





  return canPlace(

    board,

    moved

  )

  ?

  moved

  :

  null;


}









export function rotatePiece(

  board:Cell[][],

  piece:Piece

):Piece|null{


  const rotated:Piece={


    ...piece,


    rotation:

      (

        piece.rotation+1

      ) % 4



  };





  const kicks=[


    [0,0],


    [-1,0],


    [1,0],


    [0,-1],


    [0,1]



  ];






  for(

    const [kx,ky] of kicks

  ){



    const attempt:Piece={


      ...rotated,


      x:

        rotated.x+kx,


      y:

        rotated.y+ky



    };





    if(

      canPlace(

        board,

        attempt

      )

    ){



      return attempt;



    }



  }






  /*
    If trapped vertically,
    allow a 180 degree flip
    around the first blob.
  */



  const flip:Piece={


    ...piece,


    rotation:

      (

        piece.rotation+2

      ) % 4



  };





  if(

    canPlace(

      board,

      flip

    )

  ){



    return flip;



  }





  return null;


}








export function placePiece(

  board:Cell[][],

  piece:Piece

):Cell[][]{


  const next=

    board.map(

      row=>[...row]

    );



  const positions=

    getPositions(piece);





  next[

    positions[0][1]

  ][

    positions[0][0]

  ]=

    piece.first;





  next[

    positions[1][1]

  ][

    positions[1][0]

  ]=

    piece.second;





  return next;


}









function floodGroup(

  board:Cell[][],

  startX:number,

  startY:number,

  visited:Set<string>

){

  const color=

    board[startY][startX];


  const group:string[]=[];


  const queue=[

    `${startX},${startY}`

  ];


  visited.add(

    `${startX},${startY}`

  );


  while(queue.length){


    const current=

      queue.shift()!;


    group.push(current);


    const [

      x,

      y

    ]=

      current

      .split(",")

      .map(Number);




    [

      [x+1,y],

      [x-1,y],

      [x,y+1],

      [x,y-1]

    ]

    .forEach(([nx,ny])=>{


      const key=

        `${nx},${ny}`;


      if(

        nx>=0 &&

        nx<COLS &&

        ny>=0 &&

        ny<ROWS &&

        board[ny][nx]===color &&

        !visited.has(key)

      ){


        visited.add(key);


        queue.push(key);


      }


    });


  }


  return group;

}

export function findGroups(

  board:Cell[][]

):Set<string>[]{


  const groups:Set<string>[]=[];


  const visited=

    new Set<string>();





  for(

    let y=0;

    y<ROWS;

    y++

  ){



    for(

      let x=0;

      x<COLS;

      x++

    ){



      if(

        board[y][x]!==null &&

        !visited.has(`${x},${y}`)

      ){



        const group=

          floodGroup(

            board,

            x,

            y,

            visited

          );





        if(

          group.length>=4

        ){



          groups.push(

            new Set(group)

          );



        }



      }



    }



  }





  return groups;


}








export function clearGroups(

  board:Cell[][],

  groups:Set<string>[]

){



  const next=

    board.map(

      row=>[...row]

    );



  let removed=0;







  groups.forEach(group=>{



    group.forEach(cell=>{



      const [

        x,

        y

      ]=

        cell

        .split(",")

        .map(Number);





      if(

        next[y][x]!==null

      ){



        next[y][x]=null;



        removed++;



      }



    });



  });







  return {


    board:next,


    removed


  };


}








/*
  Gravity:

  A connected cluster only falls when
  it has no support beneath it.

  Supports:

  - bottom of board
  - another block below it
  - another block in the same connected cluster

*/




function getCluster(

  board:Cell[][],

  startX:number,

  startY:number,

  visited:Set<string>

):string[]{


  const cluster:string[]=[];


  const queue=[

    `${startX},${startY}`

  ];



  visited.add(

    `${startX},${startY}`

  );





  while(queue.length){



    const current=

      queue.shift()!;



    cluster.push(current);





    const [

      x,

      y

    ]=

      current

      .split(",")

      .map(Number);





    [

      [x+1,y],

      [x-1,y],

      [x,y+1],

      [x,y-1]

    ]

    .forEach(([nx,ny])=>{



      const key=

        `${nx},${ny}`;





      if(

        nx>=0 &&

        nx<COLS &&

        ny>=0 &&

        ny<ROWS &&

        board[ny][nx]!==null &&

        !visited.has(key)

      ){



        visited.add(key);



        queue.push(key);



      }



    });



  }





  return cluster;


}








function hasSupport(

  board:Cell[][],

  cluster:string[]

):boolean{


  const set=

    new Set(cluster);





  for(

    const cell of cluster

  ){



    const [

      x,

      y

    ]=

      cell

      .split(",")

      .map(Number);





    if(

      y===ROWS-1

    ){

      return true;

    }





    const below=

      `${x},${y+1}`;





    if(

      !set.has(below) &&

      board[y+1][x]!==null

    ){



      return true;


    }



  }





  return false;


}

function getFallDistance(

  board:Cell[][],

  cluster:string[]

):number{


  const set=

    new Set(cluster);


  let distance=

    ROWS;





  for(

    const cell of cluster

  ){



    const [

      x,

      y

    ]=

      cell

      .split(",")

      .map(Number);





    let drop=0;





    while(true){



      const nextY=

        y+drop+1;





      if(

        nextY>=ROWS

      ){

        break;

      }





      const below=

        `${x},${nextY}`;





      if(

        !set.has(below) &&

        board[nextY][x]!==null

      ){

        break;

      }





      drop++;



    }





    distance=

      Math.min(

        distance,

        drop

      );



  }





  return distance;


}









function moveCluster(

  board:Cell[][],

  cluster:string[],

  distance:number

){


  const blocks=

    cluster.map(cell=>{


      const [

        x,

        y

      ]=

        cell

        .split(",")

        .map(Number);





      return {


        x,

        y,


        value:

          board[y][x]


      };


    });





  blocks.forEach(block=>{


    board[block.y][block.x]=null;


  });





  blocks.forEach(block=>{


    board[block.y+distance][block.x]=

      block.value;


  });


}









export function applyGravity(

  board:Cell[][]

):Cell[][]{


  const next=

    board.map(

      row=>[...row]

    );



  let moved=true;





  while(moved){



    moved=false;



    const visited=

      new Set<string>();



    const clusters:string[][]=[];





    for(

      let y=0;

      y<ROWS;

      y++

    ){



      for(

        let x=0;

        x<COLS;

        x++

      ){



        if(

          next[y][x]!==null &&

          !visited.has(`${x},${y}`)

        ){



          clusters.push(

            getCluster(

              next,

              x,

              y,

              visited

            )

          );



        }



      }



    }







    clusters.forEach(cluster=>{



      if(

        !hasSupport(

          next,

          cluster

        )

      ){



        const distance=

          getFallDistance(

            next,

            cluster

          );





        if(

          distance>0

        ){



          moveCluster(

            next,

            cluster,

            distance

          );



          moved=true;



        }



      }



    });



  }





  return next;


}









export function isGameOver(

  board:Cell[][]

):boolean{


  for(

    let y=0;

    y<3;

    y++

  ){



    for(

      let x=0;

      x<COLS;

      x++

    ){



      if(

        board[y][x]!==null

      ){



        return true;



      }



    }



  }





  return false;


}
