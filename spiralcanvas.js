const pixelmatch = (p, q) => {
    let flg = true;
    for (let i = 0; i < 4; i++) {
        if (p[i] !== q[i]) flg = false;
    }
    return flg
}
//pixelmatch([255, 255, 255, 0], [255, 255, 255, 0]);
//pixelmatch([255, 255, 255, 0], [255, 255, 255, 12]);

//先頭の命令を読む部分
const p = q => {

    switch (q[0]) {

    }

}

function analyze(canvas, ctx, input) {
    let [width, height] = [canvas.width, canvas.height];
    let array = [];//new Uint8Array(width * height * 4);
    let hoge = ctx.getImageData(0, 0, width, height).data;
    let w = width, h = height, counter = 0, index = 0;
    //w = 20, h = 10;
    //j-x,i-y
    while (w !== 0 && h !== 0) {
        let i = counter, j = counter;
        for (i = 0; i < w - 1; i++) {
            const base = 4 * (j * width + i);
            array[index++] = hoge[base];
            array[index++] = hoge[base + 1];
            array[index++] = hoge[base + 2];
            array[index++] = hoge[base + 3];
        }
        i = w - counter - 1;
        for (j = 0; j < h - 1; j++) {
            const base = 4 * (j * width + i);
            array[index++] = hoge[base];
            array[index++] = hoge[base + 1];
            array[index++] = hoge[base + 2];
            array[index++] = hoge[base + 3];
        }
        j = h - counter - 1;
        for (i = w - 1; i >= 1; i--) {
            const base = 4 * (j * width + i);
            array[index++] = hoge[base];
            array[index++] = hoge[base + 1];
            array[index++] = hoge[base + 2];
            array[index++] = hoge[base + 3];
        }
        i = counter;
        for (j = h - 1; j >= 1; j--) {
            const base = 4 * (j * width + i);
            array[index++] = hoge[base];
            array[index++] = hoge[base + 1];
            array[index++] = hoge[base + 2];
            array[index++] = hoge[base + 3];
        }
        w -= 2;
        h -= 2;
        counter++;
        //console.log(w, h, index);
    }
    console.log(array.length);
    //    return "hoge";
    let output = "Hello, World!";
    return input;
}
module.exports.analyze = analyze;