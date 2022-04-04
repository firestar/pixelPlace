const sharp = require("sharp");
const { createCanvas } = require("canvas");
const fs = require("fs");
const Jimp = require('jimp');

function rgbDistance(r1,g1,b1,r2,g2,b2){
    //console.log(r1,g1,b1,r2,g2,b2);
    return Math.sqrt(Math.pow(r1-r2, 2)+Math.pow(g1-g2, 2)+Math.pow(b1-b2, 2));
}
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

Object.keys(colorMap).forEach(c=>colorMap[c]=Jimp.intToRGBA(Jimp.cssColorToHex(colorMap[c])));

async function resizeImage(filename, w, h) {
    try {
        await sharp(filename)
            .resize({
                width: w,
                height: h
            })
            .toFormat("png", { mozjpeg: true })
            .toFile("tmp.png");
    } catch (error) {
        console.log(error);
    }
}

const settings = {
    width: 0,
    height: 0,
    file: "",
    name: "",
    x: 0,
    y: 0,
};
process.argv.forEach((val, index) => {
    const arg = val.split("=");
    if (arg.length == 2){
        if(typeof settings[arg[0]] == "number")
            settings[arg[0]] = parseInt(arg[1]);
        else
            settings[arg[0]] = arg[1];
    }
});

console.log(settings)
resizeImage(settings.file, settings.width, settings.height).then(r => {
    const image = new Array(settings.height);
    Jimp.read('tmp.png', (err, img) => {
        var output = "var obj = {\n\tx: "+settings.x+",\n\ty: "+settings.y+",\n\tname: '"+settings.name+"',\n\tmatrix: ["
        for(var y=0;y<settings.height;y++) {
            const currentColor = {
                color: null,
                count: 0
            }
            if(!image[y])
                image[y] = [];
            for(var x=0;x<settings.width;x++) {
                const rgb = Jimp.intToRGBA(img.getPixelColor(x, y));
                var nearestColor = Object.keys(colorMap).map(c=>{
                    const mapColor = colorMap[c];
                    return {
                        color: c,
                        distance: rgbDistance(mapColor.r, mapColor.g, mapColor.b, rgb.r, rgb.g, rgb.b),
                        rgb
                    }
                }).sort((a,b)=>a.distance-b.distance)[0];

                if(nearestColor.rgb.a==0){
                    nearestColor = 'blank';
                }else{
                    nearestColor = nearestColor.color;
                }
                if(nearestColor!=currentColor.color && currentColor.color!=null){
                    image[y].push(currentColor.count+":"+currentColor.color)
                    currentColor.color = nearestColor;
                    currentColor.count = 1;
                }else if(currentColor.color!=null){
                    currentColor.count++;
                }else if(currentColor.color==null){
                    currentColor.color = nearestColor;
                    currentColor.count = 1;
                }
            }
            image[y].push(currentColor.count+":"+currentColor.color);
            console.log(y+": "+image[y].length)
            output += "\n\t\t[ '"+image[y].join("', '")+"' ],";
        }
        output += "\n\t]\n}";
        fs.writeFile('final_template.js', output, function (err) {
            if (err) return console.log(err);
            console.log('completed image template');
        });
    });
});

