
//ピクセルが一致しているかを見る関数


document.getElementById("file").addEventListener("change", e => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const file = e.target.files[0];
    try {
        if (file.type === "image/bmp" || file.type === "image/jpeg" || file.type === "image/png") {
            const reader = new FileReader();
            reader.onload = function () {
                let img = new Image();
                img.src = reader.result;
                console.log(img.src, img.width, img.naturalWidth);
                if (img.width % 2 !== 0 || img.height % 2 !== 0) {
                    throw "imgsizeerror"
                } else {
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        //console.log(canvas.width, canvas.height);
                        let input = "hoge";
                        let array = analyze(canvas, ctx, input);
                        //                     output = lexer(array);
                    }
                }
            };
            reader.readAsDataURL(file);
            console.log("su");
        } else {
            throw "typerror";
        }

    } catch (e) {
        console.log(e, file.type);
    }
});


//module.exports.analyze = analyze; 