
let pSize = 1; /*РАЗМЕР ПИКСЕЛЯ, SIZE OF ONE PIXEL*/


let size = {w: 500, h: 500};
let arrs = [[],[]];
let sum = [];

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.setAttribute("width", size.w*pSize);
canvas.setAttribute("height", size.h*pSize);
canvas.style.width = size.w*pSize + "px";
canvas.style.height = size.h*pSize + "px";



console.log("START");

for (let i = 0; i < (size.h + 2) * (size.w + 2); i++){
    arrs[0].push(0);
    sum.push(0);
}
for (let i = 0; i < (size.h + 2) * (size.w + 2); i++){
    arrs[1].push(0);
}

let ind = size.w+2;
for (let i = 1; i < (size.h + 1); i++){
    ind++;
    for (let g = 1; g < size.w + 1; g++){
        arrs[0][ind] = Math.random() < 0.5 ? 1 : 0;
        ind++
    }
    ind++;
}
let fl = 1;
let pos = [[0,0,0,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0]];
let count = 0;



let funcs = [[function (ind) {},function (ind) {}],[
    function (ind) {

    ind-=size.w+2;
        ctx.fillStyle = 'black';
    ctx.fillRect((ind%(size.w+2))*pSize,Math.floor(ind/(size.w+2) )*pSize, pSize, pSize);
}, function (ind) {

    ctx.fillStyle = 'white';
    ind-=size.w+2;
    ctx.fillRect((ind%(size.w+2))*pSize,Math.floor(ind/(size.w+2) )*pSize, pSize, pSize);}
]];



function draw() {
    let ind = size.w + 1;
    for(let i = 0; i < size.h; i++){
        ind++;
        for(let g = 0; g < size.w; g++){
            funcs[+(arrs[fl][ind] !== arrs[(fl+1)&1][ind])][arrs[fl][ind]](ind);
            ind++;
        }
        ind++;
    }
}
function lazyDraw() {
    let ind = size.w + 1;
    for(let i = 0; i < size.h; i++){
        ind++;
        for(let g = 0; g < size.w; g++){
            funcs[1][arrs[fl][ind]](ind);
            ind++;
        }
        ind++;
    }
}


function iteration() {
    for (let i = 0; i < sum.length; i++){
        sum[i] = 0;
    }


    let ind = size.w + 1;
    for(let i = 0; i < size.h; i++){
        ind++;
        for(let g = 0; g < size.w; g++){
            ind++;
            const n = arrs[(fl+1)&1][ind];
            if (n) {
                sum[ind - (size.w + 2) - 1] += n;
                sum[ind - (size.w + 2)] += n;
                sum[ind - (size.w + 2) + 1] += n;
                sum[ind - 1] += n;
                sum[ind + 1] += n;
                sum[ind + (size.w + 2) - 1] += n;
                sum[ind + (size.w + 2)] += n;
                sum[ind + (size.w + 2) + 1] += n;
            }
        }
        ind++;
    }
    ind = size.w + 1;
    for (let i = 0; i < size.h; i++){
        ind++;
        for (let g = 0; g < size.w; g++){
            ind++;
            arrs[fl][ind] = pos[arrs[(fl+1)&1][ind]][sum[ind]];
        }
        ind++;
    }
}
// setInterval(function(){console.log(count)},10000);

function main() {
    count+=1;
    iteration();
    draw();
    fl+=1;
    fl&=1;
    // requestAnimationFrame(main)
    if (count%100==0){
        let preTime = Date.now();
        console.log(preTime - time);
        time = preTime;
    }
    window.setTimeout(main,1);
}
count+=1;
iteration();
lazyDraw();
fl+=1;
fl&=1;
main();
let time = Date.now();
