
const canvas = /** @type {HTMLCanvasElement} */ document.getElementById("canvas");

var c = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 495;

const fun = document.querySelectorAll(".function div");

let selected = -1;

let funArray = [rectangle,circle,pencil];

let funHoldArray = [rectangleh,circleh,pencilh];

for(let i = 0;i < fun.length;i++){
    fun[i].addEventListener("click",function(e){
        if(selected != -1) fun[selected].style.background = "rgb(163, 162, 162)";
        selected = i;
        e.currentTarget.style.background = "lightblue";
    });
}

canvas.addEventListener("dblclick",function(e){
    if(selected != -1) funArray[selected](e);
});

var xstart,ystart,xend,yend,stime,etime;

canvas.addEventListener("mousedown",function(e){
    let x = e.clientX;
    let y = e.clientY;
    xstart = parseInt((x - ((window.innerWidth - 900) / 2)));
    ystart = parseInt(y - ((window.innerHeight - 550) / 2) - 55);
})

canvas.addEventListener("mouseup",function(e){
    let x = e.clientX;
    let y = e.clientY;
    xend = parseInt((x - ((window.innerWidth - 900) / 2)));
    yend = parseInt(y - ((window.innerHeight - 550) / 2) - 55);
})

canvas.addEventListener("click",function(e){
    if(selected != -1) funHoldArray[selected](e);
});

function rectangle(e){
    let x = e.clientX;
    let y = e.clientY;
    let xwidth = parseInt((x - ((window.innerWidth - 900) / 2)));
    let yheight = parseInt(y - ((window.innerHeight - 550) / 2) - 55);
    c.beginPath();
    c.strokeRect(xwidth,yheight,120,120);
}

function circle(e){
    let x = e.clientX;
    let y = e.clientY;
    let xwidth = parseInt((x - ((window.innerWidth - 900) / 2)));
    let yheight = parseInt(y - ((window.innerHeight - 550) / 2) - 55);
    c.beginPath();
    c.arc(xwidth,yheight,16,0,Math.PI * 2);
    c.stroke();
}

function pencil(e){}

function rectangleh(e){
    c.beginPath();
    c.strokeRect(xstart,ystart,xend - xstart,yend - ystart);
}

function circleh(e){
    let x = Math.abs(xend - xstart);
    let y = Math.abs(yend - ystart);
    let r = Math.sqrt((x * x) + (y * y));
    c.beginPath();
    c.arc(xstart,ystart,r,0,Math.PI * 2);
    c.stroke();
}

let isDrawing = false;

function pencilh(e){
    canvas.addEventListener("mousedown",start,false);

    canvas.addEventListener("mousemove",draw,false);

    canvas.addEventListener("touchstart",start,false);

    canvas.addEventListener("touchmove",draw,false);

    canvas.addEventListener("mouseup",function(e){
        if(isDrawing){
            isDrawing = false;
        c.stroke();
        c.closePath();
        }
    });

}

function start(e){
    isDrawing = true;
        c.beginPath;
        c.moveTo(xstart,ystart);
        e.preventDefault();
}

function draw(e){
    if(isDrawing){
        c.lineTo(e.clientX - canvas.offsetLeft,e.clientY - canvas.offsetTop);
        c.lineCap = "round";
        c.lineJoin = "round";
        c.stroke();
    }
}