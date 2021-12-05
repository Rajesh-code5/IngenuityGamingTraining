import { Container } from "pixi.js";
import { config } from "./config";
import { Wheel } from "./Wheel";
import { DEG_TO_RAD } from "@pixi/math";
import { Graphics } from "@pixi/graphics";
import { BlurFilter } from "@pixi/filter-blur";
import { Text } from "@pixi/text";
import { gsap } from "gsap";
import src from "gsap/src";
export class Game extends Container {
  private wheel: Wheel;
  private sliceDegree: number;
  public create() {
    this.sliceDegree = 360 / config.slices;
    this.wheel = new Wheel(
      config.radius,
      this.sliceDegree,
      config.sliceColors,
      config.prizes
    );
    this.addChild(this.wheel);

    const pin = new Graphics();
    pin.beginFill(0xffffff);
    pin.lineStyle(4,0x00008B)
    pin.moveTo(0, 0);
    pin.lineTo(-15, -30);
    pin.lineTo(15, -30);
    pin.lineTo(0, 0);
    pin.endFill();
    pin.closePath();
    pin.pivot.set(0, -25);
    pin.y = -config.radius;
    this.addChild(pin);
  }
  public spin() {
    var stopAngle = DEG_TO_RAD * (10 * this.sliceDegree - this.sliceDegree / 2);
    const weight = Math.floor(Math.random()*100);
    var prizeIndex:number ;
    if(weight == 2){ //here weight is 1 for 1000 points
        prizeIndex = 9;
        stopAngle = DEG_TO_RAD * (1 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight == 3 || weight == 4){ //here weight is 2 for 500 points
        prizeIndex = 8;
        stopAngle = DEG_TO_RAD * (2 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight>=4 && weight<=8){ //here weight is 5 for 200 points
        prizeIndex = 7;
        stopAngle = DEG_TO_RAD * (3 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight>=9 && weight<=15){ //here weight is 7 for 100 points
        prizeIndex = 6;
        stopAngle = DEG_TO_RAD * (4 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight>=16 && weight<=25){ //here weight is 10 for 50 points
        prizeIndex = 5;
        stopAngle =  DEG_TO_RAD * (5 * this.sliceDegree - this.sliceDegree / 2);
    } 
    if(weight>=26 && weight<=37){ //here weight is 12 for 20 points
        prizeIndex = 4;
        stopAngle = DEG_TO_RAD * (6 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight >= 38 && weight <= 50){ //here weight is 13 for 10 points
        prizeIndex = 3;
        stopAngle = DEG_TO_RAD * (7 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight >= 51 && weight <= 65){ //here weight is 15 for 5 points
        prizeIndex = 2;
        stopAngle = DEG_TO_RAD * (8 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight >= 66 && weight <= 81){ //here weight is 16 for 3 points
        prizeIndex = 1;
        stopAngle = DEG_TO_RAD * (9 * this.sliceDegree - this.sliceDegree / 2);
    }
    if(weight >= 82 && weight <= 100){ //here weight is 19 for 1 point
        prizeIndex = 0;
        stopAngle = DEG_TO_RAD * (10 * this.sliceDegree - this.sliceDegree / 2);
    }
    const blur = new BlurFilter(10, 10);
    this.wheel.filters = [blur];
    gsap.to(blur, {
      blur: 0,
      duration: config.duration,
      ease: "power4.inOut",
    });
    gsap.fromTo(
      this.wheel,
      { rotation: DEG_TO_RAD * 3600 },
      {
        duration: config.duration,
        rotation: stopAngle,
        ease: "cric.out",
        onComplete: () => {
          const winAnnouncement = new Text(`You won ${config.prizes[prizeIndex]}`, {
            fontFamily: "Orange Juice",
            fontSize: 60,
            fill: 0xffffff,
            align: "center",
          });
          winAnnouncement.pivot.set(
            winAnnouncement.width / 2,
            winAnnouncement.height / 2
          );
          setTimeout(() => {
            gsap.to(this.children, {
              duration: 0.5,
              alpha: 0,
              onComplete: () => {
                this.addChild(winAnnouncement);
              },
            });
          }, 2000);
        },
      }
    );
  }
}