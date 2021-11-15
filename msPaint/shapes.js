class shapes{
    constructor(c,x1,y1,x2,y2){
        this.c = c;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    create(){

    }
}

class triangle extends shapes{
    create(c,x1,y1,x2,y2){
        c.beginPath();
        c.moveTo(x1,y1);
        c.lineTo(x2,y2);
        c.lineTo(x1,y2);
        c.lineTo(x1,y1);
        c.stroke();
        c.closePath();
    }
}

class diamond extends shapes{
    create(c,x1,y1,x2,y2){
        c.beginPath();
        c.moveTo((x1 + x2) / 2,y1);
        c.lineTo(x2,(y1 + y2) / 2);
        c.lineTo((x1 + x2) / 2,y2);
        c.lineTo(x1,(y1 + y2)/ 2);
        c.lineTo((x1 + x2) / 2,y1);
        c.stroke();
        c.closePath();
    }
}

// class pentagon extends shapes{
//     create(c,x1,y1,x2,y2){
//         c.beginPath();
//         c.moveTo((x1 + x2) / 2,y1);
//         c.lineTo(x2,(y1 + y2) / 2);
//         c.lineTo((x1 + x2) / 2,y2);

//         c.lineTo(x1,(y1 + y2)/ 2);
//         c.lineTo((x1 + x2) / 2,y1);
//         c.stroke();
//         c.closePath();
//         console.log(parseInt((x1 + x2) / 4));
//     }
// }