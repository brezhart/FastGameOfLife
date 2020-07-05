console.log("START");

let size = {w: 500, h: 500};
let arrs = [[],[]];
let sum = [];

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
function iteration() {
    for (let i = 0; i < sum.length; i++){
        sum[i] = 0;
    }


    let ind = size.w + 1;
    for(let i = 0; i < size.h; i++){
        ind+=1;
        for(let g = 0; g < size.w; g++){
            ind+=1;
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
        ind+=1;
    }
    ind = size.w + 1;
    for (let i = 0; i < size.h; i++){
        ind+=1;
        for (let g = 0; g < size.w; g++){
            ind++;
            arrs[fl][ind] = pos[arrs[(fl+1)&1][ind]][sum[ind]];
        }
        ind+=1
    }
}
// setInterval(function(){console.log(count)},10000);

function main() {
    count+=1;
    iteration();
    fl+=1;
    fl&=1;
    // requestAnimationFrame(main)
    if (count%100==0){
        let preTime = Date.now();
        console.log(preTime - time);
        time = preTime;
    }
    setImmediate(main);
}
let time = Date.now();

main();
