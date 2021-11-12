const canvas = /** @type {HTMLCanvasElement} */ document.getElementById("canvas");

var c = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 495;
c.lineJoin = "round";
c.lineWidth = "3";

const fun = document.querySelectorAll(".function div");

let selected = -1;
let isDrawing = false,isEraser = false;

let funArray = [rectangle,circle,];

let funHoldArray = [rectangleh,circleh];

document.getElementById("color").addEventListener("change",function(e){
    c.strokeStyle = document.getElementById("color").value;
    canvas.style.color = document.getElementById("color")
})

for(let i = 0;i < fun.length;i++){
    fun[i].addEventListener("click",function(e){
        if(selected != -1) fun[selected].style.background = "rgb(163, 162, 162)";
        selected = i;
        e.currentTarget.style.background = "lightblue";
    });
}

canvas.addEventListener("dblclick",function(e){
    if(selected == 0 || selected == 1) funArray[selected](e);
});

var xstart,ystart,xend,yend,stime,etime;

canvas.addEventListener("mousedown",function(e){
    xstart = parseInt((e.clientX - ((window.innerWidth - 900) / 2)));
    ystart = parseInt(e.clientY - ((window.innerHeight - 550) / 2) - 55);
    
    if(selected == 2){
        isDrawing = true;
        c.beginPath();
        c.moveTo(xstart,ystart);
    }

    else if(selected == 3){
        isEraser = true;
        c.clearRect(xstart,ystart,40,40);
    }

})

canvas.addEventListener("mousemove",function(e){
    if(isDrawing){
        c.lineTo(parseInt(e.clientX - ((window.innerWidth - 900) / 2)),parseInt(e.clientY - ((window.innerHeight - 550) / 2) - 55));
        c.stroke();
    }

    if(isEraser){
        c.clearRect(parseInt(e.clientX - ((window.innerWidth - 900) / 2)),parseInt(e.clientY - ((window.innerHeight - 550) / 2) - 55),40,40);
    }
});

canvas.addEventListener("mouseup",function(e){
    let x = e.clientX;
    let y = e.clientY;
    xend = parseInt((x - ((window.innerWidth - 900) / 2)));
    yend = parseInt(y - ((window.innerHeight - 550) / 2) - 55);
    if(isDrawing){
        c.stroke();
        isDrawing = false;
    }

    else if(selected == 3) isEraser = false;
})

canvas.addEventListener("click",function(e){
    if(selected == 1 || selected == 0) funHoldArray[selected](e);

    else if(selected == 4){
       let tri = new triangle();
       tri.create(c,xstart,ystart,xend,yend);
    }

    else if(selected == 5){
        let tri = new diamond();
        tri.create(c,xstart,ystart,xend,yend);
    }
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

function rectangleh(e){
    c.beginPath();
    c.strokeRect(xstart,ystart,xend - xstart,yend - ystart);
    c.closePath();
}

function circleh(e){
    let x = Math.abs(xend - xstart);
    let y = Math.abs(yend - ystart);
    let r = Math.sqrt((x * x) + (y * y));
    c.beginPath();
    c.arc(xstart + Math.abs(xend - xstart) / 2,ystart + Math.abs(yend - ystart) / 2,r/2,0,Math.PI * 2);
    c.stroke();
    c.closePath();
}