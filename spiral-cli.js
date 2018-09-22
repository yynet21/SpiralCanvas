const fs = require('fs');
const { JSDOM } = require('jsdom');
const Canvas = require("canvas");
//console.log("expect hello.spiralcanvas", process.argv[2], "expect input", process.argv[3]);
//実行部
const SprialCanvas = require("./spiralcanvas");

//console.log("hoge000");
const jsdom = new JSDOM(fs.readFileSync("index.html").toString(), { runScripts: 'outside-only' });
let document = jsdom.window.document;

if (process.argv.length < 4) {
    process.stderr.write(`Usage: node ${process.argv[1]} <file> <input>`);
    process.exit(1);
}

//code は画像にあたる。
//const code = fs.readFileSync(process.argv[2]).toString();

let img;
const input = fs.readFileSync(process.argv[3]).toString();
//console.log("ho");

//画像の読み込み
//$1はソースコード
const st = fs.readFileSync(process.argv[2]).toString();
//console.log(st);
fs.readFile(process.argv[2], function (err, data) {
    //    console.log(data);
    if (err) throw err;

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    function onloadImg() {

        return new Promise((resolve, reject) => {

            img = new Canvas.Image();
            img.src = data;
            resolve(img);

            // img.onload = () => resolve(img);
            // img.onerror = () => reject(new Error('Failed to load image'));

        })
    }

    onloadImg().then(x => {
        //console.log(x);
        canvas.width = x.width;
        canvas.height = x.height;

        ctx.drawImage(img, 0, 0);
        //console.log(canvas, input);
        let output = SprialCanvas.analyze(canvas, ctx, input);
        console.log(output);

    }).catch(function (error) {

        // 非同期処理失敗。呼ばれない
        console.log(error);
    });;

});
//inputは標準入力として受け入れるべきもの
//http://jxck.hatenablog.com/entry/20111112/1321079097

//jsdom.window.stdin = input;
//jsdom.window.eval(htmsScript);

//sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
//nodejs sprial-cli.js code.bmp input

/*
const fs = require('fs');
const { JSDOM } = require('jsdom');

if (process.argv.length < 4) {
	process.stderr.write(`Usage: node ${process.argv[1]} <file> <input>`);
	process.exit(1);
}

const code = fs.readFileSync(process.argv[2]).toString();
const input = process.argv[3];

const htmsScript = fs.readFileSync('htms.min.js').toString();

const jsdom = new JSDOM(code, { runScripts: 'outside-only' });
jsdom.window.stdin = input;
jsdom.window.eval(htmsScript);
console.log(jsdom.window.htms.default);
*/
