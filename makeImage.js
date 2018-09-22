let array = [];
let str = "Hello, World!\n"
for (let i = 0; i < str.length; i++) {
    array[i] = str.charCodeAt(i);
}
console.log(array);
array[0] = 0;
array[1] = 0;
array[2] = 255;
array[3] = 255;
//arrayの情報を元に画像を生成する。
make();
function make() {
    let size = Math.ceil(Math.sqrt(array.length / 4));
    if (size % 2 === 1) size++;

    console.log(size);
    let canvas = document.getElementById("canvas");
    canvas.width = 600;//size;
    canvas.height = 100;//size;
    let ctx = canvas.getContext("2d");
    let [width, height] = [canvas.width, canvas.height];
    let img = ctx.getImageData(0, 0, width, height);
    let hoge = img.data;
    let w = width, h = height, counter = 0, index = 0;
    let per = 0;
    let nowarraylen = array.length;
    while (per <= Math.min(w, h)) {
        if (per * (w + h) - per * per - nowarraylen / 4 >= 0) break;
        per += 2;
    }
    /*    let newsize = 4 * (per * (w + h) - per * per);
        for (let i = nowarraylen; i < newsize; i++) {
            array[i] = 0;
        }
    console.log(newsize);*/
    console.log(w, h);
    let halfper = per / 2;
    while (per > 0) {

        let i = counter, j = counter;
        for (i = 0; i < w - 1; i++) {
            const base = 4 * (j * width + i);
            hoge[base] = array[index++];
            hoge[base + 1] = array[index++];
            hoge[base + 2] = array[index++];
            hoge[base + 3] = array[index++];
        }
        i = w - counter - 1;
        for (j = 0; j < h - 1; j++) {
            const base = 4 * (j * width + i);
            hoge[base] = array[index++];
            hoge[base + 1] = array[index++];
            hoge[base + 2] = array[index++];
            hoge[base + 3] = array[index++];
        }
        j = h - counter - 1;
        for (i = w - 1; i >= 1; i--) {
            const base = 4 * (j * width + i);
            hoge[base] = array[index++];
            hoge[base + 1] = array[index++];
            hoge[base + 2] = array[index++];
            hoge[base + 3] = array[index++];
        }
        i = counter;
        for (j = h - 1; j >= 1; j--) {
            const base = 4 * (j * width + i);
            hoge[base] = array[index++];
            hoge[base + 1] = array[index++];
            hoge[base + 2] = array[index++];
            hoge[base + 3] = array[index++];
        }
        w -= 2;
        h -= 2;
        per -= 2;
    }
    console.log(index, hoge, array);

    ctx.putImageData(img, 0, 0);
    {
        let img = ctx.getImageData(halfper, halfper, width - halfper, height - halfper);
        const newcanvas = document.createElement("canvas");
        const newctx = canvas.getContext("2d");
        newcanvas.width = img.width;
        newcanvas.height = img.height;
        newctx.font = "bold 40px 'MS明朝'";
        newctx.fillStyle = 'red';
        newctx.fillText("Hello, World!\n", 0, 50);

        ctx.drawImage(newcanvas, halfper, halfper);
        console.log(halfper, "finished");
        console.log(ctx.getImageData(0, 0, width, height).data);
        canvas.toBlob(function (e) {
            const n = document.createElement("a");
            const a = URL.createObjectURL(e);
            n.onload = () => {
                URL.revokeObjectURL(a)
            };
            n.href = a, n.download = "code.bmp";
            n.click();
        }, "image/bmp");
    }
}

