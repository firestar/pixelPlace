const { createCanvas } = require("canvas");
const fs = require("fs");

const colorMap = {
        'burgundy':'6D001A',
        'dark_red':'BE0039',
        'red':'FF4500',
        'orange':'FFA800',
        'yellow':'FFD635',
        'pale_yellow':'FFF8B8',
        'dark_green':'00A368',
        'green':'00CC78',
        'light_green':'7EED56',
        'dark_teal':'00756F',
        'teal':'009EAA',
        'light_teal':'00CCC0',
        'dark_blue':'2450A4',
        'blue':'3690EA',
        'light_blue':'51E9F4',
        'indigo':'493AC1',
        'periwinkle':'6A5CFF',
        'lavender':'94B3FF',
        'dark_purple':'811E9F',
        'purple':'B44AC0',
        'pale_purple':'E4ABFF',
        'magenta':'DE107F',
        'pink':'FF3881',
        'light_pink':'FF99AA',
        'dark_brown':'6D482F',
        'brown':'9C6926',
        'beige':'FFB470',
        'black':'000000',
        'dark_gray':'515252',
        'gray':'898D90',
        'light_gray':'D4D7D9',
        'white':'FFFFFF'
    }
const objects = [
  {
    name: 'numi', // noomba
    // (1974, 1322)
    x: 1974, // start x position
    y: 1321, // start y position 
    matrix: [
            // 14 repeating black
        ['14:black'],
            // 1 black, 12 repeating burgundy, 1 black
        ['1:black', '12:burgundy', '1:black'], 
            // 1 black, 12 repeating burgundy, 1 black
        ['1:black', '12:burgundy', '1:black'], 
            // 1 black, 2 repeating burgundy, 2 repeating black, 3 repeating burgundy, 2 repeating black, 3 repeating burgundy, 1 black
        ['1:black', '2:burgundy', '2:black', '3:burgundy', '2:black', '3:burgundy', '1:black' ], 
        ['1:black', '2:burgundy', '1:black', '1:dark_red', '3:black', '1:dark_red', '1:black', '3:burgundy', '1:black'],
        ['1:black', '2:burgundy', '2:black', '3:dark_gray', '2:black', '3:burgundy', '1:black' ],
        ['1:black', '1:burgundy', '2:black', '1:dark_gray', '1:black', '1:dark_gray', '1:black', '1:dark_gray', '2:black', '2:burgundy', '1:black' ],
        ['1:black', '1:burgundy', '1:black', '7:dark_gray', '1:black', '2:burgundy', '1:black' ],
        ['1:black', '1:burgundy', '1:black', '1:dark_gray', '1:light_pink', '3:dark_gray', '1:light_pink', '1:dark_gray', '1:black', '2:burgundy', '1:black' ],
        ['1:black', '1:burgundy', '1:black', '7:dark_gray', '1:black', '2:burgundy', '1:black' ],
        ['1:black', '1:burgundy', '1:black', '7:dark_gray', '1:black', '2:burgundy', '1:black' ],
        ['1:dark_brown', '1:burgundy', '9:black', '2:burgundy', '1:black' ],
        ['1:brown', '1:dark_brown', '11:burgundy', '1:black'],
        ['2:brown', '4:dark_brown', '7:burgundy', '1:black']
    ]
  },
    {
        x: 124,
        y: 1156,
        name: 'test',
        matrix: [
            [ '2:blank', '1:black', '1:burgundy', '1:black', '1:blank', '6:black', '1:blank', '1:black', '2:burgundy' ],
            [ '1:blank', '1:black', '3:burgundy', '1:black', '6:dark_gray', '1:black', '3:burgundy' ],
            [ '1:blank', '1:black', '1:burgundy', '1:black', '1:dark_gray', '7:gray', '2:dark_brown', '1:black', '1:burgundy' ],
            [ '1:blank', '1:black', '1:burgundy', '1:dark_gray', '10:gray', '1:dark_brown', '1:burgundy' ],
            [ '1:blank', '1:black', '1:dark_gray', '2:gray', '1:dark_gray', '8:gray', '2:dark_gray' ],
            [ '1:black', '2:dark_gray', '2:dark_purple', '4:gray', '1:dark_gray', '1:gray', '1:dark_purple', '1:dark_blue', '2:dark_purple', '1:dark_gray' ],
            [ '1:black', '3:dark_gray', '2:gray', '1:dark_gray', '2:dark_purple', '1:gray', '6:dark_gray' ],
            [ '1:black', '2:dark_gray', '2:gray', '1:light_pink', '2:gray', '1:dark_gray', '1:gray', '2:dark_gray', '1:gray', '3:dark_gray' ],
            [ '1:black', '1:dark_gray', '2:light_gray', '1:white', '1:gray', '2:pale_yellow', '1:light_gray', '1:gray', '2:light_gray', '1:gray', '3:dark_gray' ],
            [ '1:black', '1:dark_gray', '1:light_gray', '1:black', '1:dark_gray', '1:light_gray', '2:pale_yellow', '1:gray', '1:light_gray', '1:dark_gray', '1:gray', '1:light_gray', '3:dark_gray' ],
            [ '1:black', '1:dark_gray', '1:white', '1:dark_gray', '2:gray', '2:pale_yellow', '1:gray', '1:light_gray', '1:black', '1:dark_gray', '1:light_gray', '2:dark_gray', '1:light_pink' ],
            [ '1:dark_blue', '1:blue', '3:gray', '1:light_pink', '2:pale_yellow', '1:light_pink', '2:light_gray', '1:white', '2:gray', '1:dark_gray', '1:light_pink' ],
            [ '1:blue', '1:gray', '8:light_pink', '2:gray', '2:blue', '1:dark_blue', '1:light_gray' ],
            [ '2:dark_gray', '2:pale_yellow', '1:light_gray', '1:pink', '2:light_pink', '1:pink', '2:pale_yellow', '1:light_pink', '1:light_gray', '1:blue', '1:dark_blue', '1:dark_gray' ],
            [ '1:black', '1:dark_brown', '1:dark_gray', '1:light_gray', '1:pale_yellow', '1:light_pink', '1:pink', '2:light_pink', '3:pale_yellow', '1:gray', '3:dark_gray' ],
            [ '1:black', '3:dark_gray', '2:gray', '1:light_pink', '1:gray', '2:light_pink', '6:dark_gray' ]
        ]
    },
        {
        x: 1962,
        y: 1335,
        name: 'lily',
        matrix: [
            [ '27:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black', '1:teal', '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black', '1:gray', '1:black', '1:gray', '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black', '1:gray', '1:black', '1:dark_gray', '1:black', '1:dark_gray', '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black', '1:dark_gray', '2:black', '1:teal', '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black', '1:dark_gray', '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '3:black', '1:dark_gray', '3:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '3:black', '3:dark_gray', '1:black', '2:dark_gray', '3:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '3:black', '9:dark_gray', '3:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '2:black', '13:dark_gray', '2:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black', '4:dark_gray', '1:light_gray', '5:dark_gray', '1:light_gray', '4:dark_gray', '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '2:black', '3:dark_gray', '1:light_gray', '7:dark_gray', '1:light_gray', '3:dark_gray', '2:black', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:black', '3:dark_gray', '1:light_gray', '1:gray', '7:dark_gray', '1:gray', '1:light_gray', '3:dark_gray', '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '2:black', '3:dark_gray', '1:light_gray', '1:light_pink', '7:dark_gray', '1:light_pink', '1:light_gray', '3:dark_gray', '2:black', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:black', '3:dark_gray', '2:light_gray', '1:pale_yellow', '1:light_pink', '5:dark_gray', '1:light_pink', '1:pale_yellow', '2:light_gray', '3:dark_gray', '1:black', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '2:black', '3:dark_gray', '2:light_gray', '2:black', '2:light_pink', '1:lavender', '2:light_pink', '2:black', '2:light_gray', '3:dark_gray', '2:black', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:black', '4:dark_gray', '2:light_gray', '1:lavender', '1:dark_blue', '2:pale_yellow', '1:lavender', '2:pale_yellow', '1:dark_blue', '1:lavender', '2:light_gray', '4:dark_gray', '1:black', '1:light_blue', '1:black' ],
            [ '2:black', '2:dark_gray', '1:black', '2:dark_gray', '2:light_gray', '1:white', '1:pale_purple', '5:pale_yellow', '1:pale_purple', '1:white', '2:light_gray', '2:dark_gray', '1:black', '2:dark_gray', '2:black' ],
            [ '3:black', '1:light_gray', '1:black', '2:dark_gray', '2:light_gray', '1:lavender', '7:pale_yellow', '1:lavender', '2:light_gray', '2:dark_gray', '1:black', '1:light_gray', '3:black' ],
            [ '1:black', '1:teal', '1:light_blue', '2:black', '2:dark_gray', '2:light_gray', '1:light_pink', '1:lavender', '2:pale_yellow', '1:light_pink', '2:pale_yellow', '1:lavender', '1:light_pink', '2:light_gray', '2:dark_gray', '2:black', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '2:black', '2:dark_gray', '2:light_gray', '7:black', '2:light_gray', '2:dark_gray', '2:black', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black', '1:gray', '1:dark_gray', '2:light_gray', '2:dark_blue', '3:light_pink', '2:dark_blue', '2:light_gray', '1:dark_gray', '1:gray', '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:black', '1:light_gray', '1:black', '1:gray', '1:dark_gray', '1:light_gray', '1:dark_blue', '1:blue', '1:pale_yellow', '1:brown', '1:pale_yellow', '1:blue', '1:dark_blue', '1:light_gray', '1:dark_gray', '1:gray', '1:black', '1:light_gray', '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:black', '1:light_gray', '2:dark_gray', '1:black', '1:gray', '1:dark_gray', '1:lavender', '2:blue', '1:pink', '2:blue', '1:lavender', '1:dark_gray', '1:gray', '1:black', '2:dark_gray', '1:light_gray', '1:black', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:black', '1:light_gray', '2:dark_gray', '1:black', '1:light_pink', '2:black', '1:lavender', '1:white', '1:pink', '1:white', '1:pink', '1:white', '1:lavender', '2:black', '1:light_pink', '1:black', '2:dark_gray', '1:light_gray', '1:black', '1:light_blue', '1:black' ],
            [ '2:black', '1:light_gray', '2:dark_gray', '1:black', '2:pale_yellow', '1:light_pink', '1:black', '1:light_pink', '1:pale_yellow', '1:pink', '1:pale_yellow', '1:pink', '1:pale_yellow', '1:light_pink', '1:black', '1:light_pink', '2:pale_yellow', '1:black', '2:dark_gray', '1:light_gray', '2:black' ],
            [ '2:black', '1:light_gray', '2:dark_gray', '1:black', '1:pale_yellow', '1:light_pink', '1:black', '1:dark_blue', '1:blue', '1:light_pink', '1:pale_yellow', '1:light_pink', '1:pale_yellow', '1:light_pink', '1:blue', '1:dark_blue', '1:black', '1:light_pink', '1:pale_yellow', '1:black', '2:dark_gray', '1:light_gray', '2:black' ],
            [ '2:black', '1:light_gray', '3:dark_gray', '2:black', '1:dark_blue', '2:blue', '1:dark_blue', '3:blue', '1:dark_blue', '2:blue', '1:dark_blue', '2:black', '3:dark_gray', '1:light_gray', '2:black' ],
            [ '1:black', '1:light_blue', '1:black', '1:light_gray', '3:dark_gray', '1:black', '1:lavender', '1:blue', '1:dark_blue', '5:blue', '1:dark_blue', '1:blue', '1:lavender', '1:black', '3:dark_gray', '1:light_gray', '1:black', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:black', '4:dark_gray', '1:black', '1:lavender', '7:white', '1:lavender', '1:black', '4:dark_gray', '1:black', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '2:black', '3:dark_gray', '1:black', '2:light_pink', '1:black', '1:dark_gray', '1:black', '2:light_pink', '1:black', '3:dark_gray', '2:black', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '4:black', '2:dark_blue', '3:black', '2:pale_yellow', '4:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black', '2:pale_yellow', '1:black', '1:light_blue', '1:black', '2:pale_yellow', '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black', '2:pale_yellow', '1:black', '1:teal', '1:black', '2:pale_yellow', '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '1:black', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black', '2:pale_yellow', '1:black', '1:light_blue', '1:black', '2:pale_yellow', '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:black' ],
            [ '1:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '2:light_blue', '2:black', '1:light_blue', '1:teal', '1:light_blue', '2:black', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:light_blue', '1:teal', '1:black' ],
            [ '27:black' ],
        ]
    },
]
var canvas = createCanvas(6000,6000);
var ctx = canvas.getContext("2d");

const scale=1;
for(var oInd=0;oInd<objects.length;oInd++){
  const object = objects[oInd];
  const matrix = object.matrix;
  console.log('rendering '+object.name);
  for(var y=0;y<matrix.length;y++){
    var xPos = object.x;
    var len = matrix[y].length;
    for(var x=0;x<len;x++){
      const data = matrix[y][x].split(":");
      const dataLen = data.length;
      if(!dataLen || dataLen<2){
        break;
      }
      const color = data[dataLen-1];
      const xCount = data[dataLen-2];
      if(color!='blank') {
          ctx.fillStyle = '#' + colorMap[color];
      }else{
          ctx.fillStyle = 'rgba(255, 255, 255, 0)';
      }
      for(var c=1;c<=parseInt(xCount);c++){
        ctx.fillRect(xPos*3+1, (y+object.y)*3+1, 1,1);
        xPos++;
      }
    }
  }
}
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./template.png", buffer);
