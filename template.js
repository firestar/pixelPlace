const { createCanvas } = require("canvas");
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
    'numi': {
      y: 1322,
      x: 974,
      data: [
          ['1:black', '12:burgundy'],
          ['1:black', '12:burgundy'],
          ['1:black', '2:burgundy', '2:black', '3:burgundy', '2:black', '3:burgundy' ],
          ['1:black', '2:burgundy', '1:black', '1:dark_red', '3:black', '1:dark_red', '1:black', '3:burgundy'],
          ['1:black', '2:burgundy', '2:black', '3:dark_gray', '2:black', '3:burgundy' ],
          ['1:black', '1:burgundy', '2:black', '1:dark_gray', '1:black', '1:dark_gray', '1:black', '1:dark_gray', '2:black', '2:burgundy' ],
          ['1:black', '1:burgundy', '1:black', '7:dark_gray', '1:black', '2:burgundy' ],
          ['2:burgundy', '1:black', '1:dark_gray', '1:light_pink', '3:dark_gray', '1:light_pink', '1:dark_gray', '1:black', '2:burgundy' ],
          ['2:burgundy', '1:black', '7:dark_gray', '1:black', '2:burgundy' ],
          ['2:burgundy', '1:black', '7:dark_gray', '1:black', '2:burgundy' ],
          ['1:dark_brown', '1:burgundy', '9:black', '2:burgundy' ],
          ['1:brown', '1:dark_brown', '11:burgundy'],
          ['2:brown', '1:dark_brown', '10:burgundy'],
      ]
    }
  }
]
var canvas = document.createElement("canvas");
canvas.width = 6000;
canvas.height = 6000;
var ctx = canvas.getContext("2d");
const yPos = 1322;
const scale=1;
for(var y=0;y<matrix.length;y++){
    var xPos = 0;
    var len = matrix[y].length;
    for(var x=0;x<len;x++){
        const data = matrix[y][x].split(":");
        const dataLen = data.length;
        if(!dataLen || dataLen<2){
            break;
        }
        const color = data[dataLen-1];
        const xCount = data[dataLen-2];
        const xStart = 0;
        if(dataLen>2){
            xPos = parseInt(data[0]);
        }
        ctx.fillStyle = '#'+colorMap[color];
        for(var c=1;c<=parseInt(xCount);c++){
            ctx.fillRect(xPos*3+1, (y+yPos)*3+1, 1,1);
            xPos++;
        }
    }
}
var scaled = document.createElement("img");
var url = canvas.toDataURL('image/png');

