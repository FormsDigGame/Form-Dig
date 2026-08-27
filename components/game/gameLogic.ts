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

    x:Math.floor(COLS/2),

    y:1,

    rotation:0,

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





function getOffset(
  rotation:number
){

  switch(rotation % 4){

    case 1:

      return [
        [0,0],
        [1,0]
      ];


    case 2:

      return [
        [0,0],
        [0,-1]
      ];


    case 3:

      return [
        [0,0],
        [-1,0]
      ];


    default:

      return [
        [0,0],
        [0,1]
      ];

  }

}





export function getPositions(
  piece:Piece
):number[][]{


  return getOffset(piece.rotation)
  .map(([ox,oy])=>[

    piece.x+ox,

    piece.y+oy

  ]);


}





export function canPlace(

  board:Cell[][],

  piece:Piece

){


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


  const directions=[

    1,

    -1

  ];



  const attempts:Piece[]=[];



  directions.forEach(direction=>{


    const rotated:Piece={

      ...piece,

      rotation:
        (
          piece.rotation+
          direction+
          4
        ) % 4

    };



    attempts.push(rotated);



    attempts.push({

      ...rotated,

      x:
        rotated.x-1

    });



    attempts.push({

      ...rotated,

      x:
        rotated.x+1

    });



    attempts.push({

      ...rotated,

      y:
        rotated.y-1

    });



    attempts.push({

      ...rotated,

      y:
        rotated.y+1

    });



  });





  for(
    const attempt of attempts
  ){


    if(
      canPlace(
        board,
        attempt
      )
    ){

      return attempt;

    }


  }




  return null;

}







export function placePiece(

  board:Cell[][],

  piece:Piece

):Cell[][]{


  const next =

    board.map(

      row=>[...row]

    );



  getPositions(piece)

  .forEach(([x,y],index)=>{


    if(

      x>=0 &&
      x<COLS &&
      y>=0 &&
      y<ROWS

    ){


      next[y][x]=

        index===0

        ?

        piece.first

        :

        piece.second;


    }


  });



  return next;

}







/*
  Puyo style cluster gravity.

  Connected blocks stay together.
  Unsupported connected groups fall
  as a shape and stop on support.
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
        board[ny][nx] &&
        !visited.has(key)

      ){

        visited.add(key);

        queue.push(key);

      }


    });


  }



  return cluster;

}





export function applyGravity(

  board:Cell[][]

):Cell[][]{


  let current=

    board.map(row=>[...row]);



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

          current[y][x] &&

          !visited.has(`${x},${y}`)

        ){


          clusters.push(

            getCluster(

              current,

              x,

              y,

              visited

            )

          );


        }


      }

    }



    for(
      const cluster of clusters
    ){


      let canFall=true;



      const cells=

        cluster.map(cell=>

          cell
          .split(",")
          .map(Number)

        );



      for(
        const [x,y] of cells
      ){


        const belowY=y+1;



        if(
          belowY>=ROWS
        ){

          canFall=false;

          break;

        }



        const belowKey=

          `${x},${belowY}`;



        if(

          !cluster.includes(belowKey) &&

          current[belowY][x]!==null

        ){

          canFall=false;

          break;

        }


      }



      if(canFall){


        const moving=

          cells.map(([x,y])=>({

            x,

            y,

            value:

              current[y][x]

          }));


        moving.forEach(block=>{

          current[block.y][block.x]=null;

        });



        moving.forEach(block=>{

          current[block.y+1][block.x]=

            block.value;

        });



        moved=true;


      }


    }


  }



  return current;

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

){


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

        board[y][x] &&

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

    board.map(row=>[...row]);



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
        next[y][x]
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








export function isGameOver(

  board:Cell[][]

):boolean{


  const checkRows=3;



  for(
    let y=0;
    y<checkRows;
    y++
  ){


    for(
      let x=0;
      x<board[y].length;
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