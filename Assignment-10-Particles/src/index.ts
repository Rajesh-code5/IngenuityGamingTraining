import * as particles from "@pixi/particle-emitter";
import {gsap} from "gsap";
import { Application, Container, ParticleContainer, Graphics } from "pixi.js";
import { Loader } from "./Loader";
const app = new Application({
  width: 1200,
  height: 720,
  view: document.getElementById("my-canvas") as HTMLCanvasElement,
  backgroundColor: 0x202020,
  antialias: true,
});
const loader = new Loader();
loader.start((l, r) => {
  console.log(r);

  const container = new Container();
  app.stage.addChild(container);
  const pConfig: particles.EmitterConfigV3 = {
    lifetime: {
      min: 1.75,
      max: 2.5,
    },
    ease: [
      {
        s: 0,
        cp: 0.379,
        e: 0.548,
      },
      {
        s: 0.548,
        cp: 0.717,
        e: 0.676,
      },
      {
        s: 0.676,
        cp: 0.635,
        e: 1,
      },
    ],
    frequency: 0.005,
    emitterLifetime: 0,
    maxParticles: 500,
    addAtBack: false,
    pos: {
      x: app.screen.width / 2,
      y: app.screen.height ,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                time: 0,
                value: 1,
              },
              {
                time: 1,
                value: 0.5,
              },
            ],
          },
        },
      },
      {
        type: "moveAcceleration",
        config: {
          accel: {
            x: 0,
            y: 750,
          },
          minStart: 900,
          maxStart: 1000,
          rotate: true,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                time: 0,
                value: 0.25,
              },
              {
                time: 1,
                value: 0.35,
              },
            ],
          },
          minMult: 1,
        },
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 0,
          maxSpeed: 200,
          minStart: 250,
          maxStart: 290,
        },
      },
      {
        type: "animatedRandom",
        config: {
          anims: [
            {
              framerate: 20,
              loop: true,
              textures: [
                "gold_1.png",
                "gold_2.png",
                "gold_3.png",
                "gold_4.png",
                "gold_5.png",
                "gold_6.png",
              ],
            },
            {
              framerate: 20,
              loop: true,
              textures: [
                "gold_6.png",
                "gold_5.png",
                "gold_4.png",
                "gold_3.png",
                "gold_2.png",
                "gold_1.png",
              ],
            },
          ],
        },
      },
      {
        type: "spawnShape",
        config: {
          type: "torus",
          data: {
            x: 0,
            y: 0,
            radius: 5,
            innerRadius: 0,
            affectRotation: false,
          },
        },
      },
    ],
  };
  const pConfig2: particles.EmitterConfigV3 = {
    lifetime: {
      min: 1.75,
      max: 2.5,
    },
    ease: [
      {
        s: 0,
        cp: 0.379,
        e: 0.548,
      },
      {
        s: 0.548,
        cp: 0.717,
        e: 0.676,
      },
      {
        s: 0.676,
        cp: 0.635,
        e: 1,
      },
    ],
    frequency: 0.005,
    emitterLifetime: 0,
    maxParticles: 500,
    addAtBack: false,
    pos: {
      x: app.screen.width,
      y: app.screen.height,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                time: 0,
                value: 1,
              },
              {
                time: 1,
                value: 0.5,
              },
            ],
          },
        },
      },
      {
        type: "moveAcceleration",
        config: {
          accel: {
            x: 0,
            y: 750,
          },
          minStart: 900,
          maxStart: 1000,
          rotate: true,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                time: 0,
                value: 0.25,
              },
              {
                time: 1,
                value: 0.35,
              },
            ],
          },
          minMult: 1,
        },
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 0,
          maxSpeed: 200,
          minStart: 250,
          maxStart: 240,
        },
      },
      {
        type: "animatedRandom",
        config: {
          anims: [
            {
              framerate: 20,
              loop: true,
              textures: ["snow"],
            },
            {
              framerate: 20,
              loop: true,
              textures: ["bubble"],
            },
            {
              framerate: 20,
              loop: false,
              textures: [
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Pop1.png",
                "Pop2.png",
                "Pop3.png",
                "gold_1.png",
              ],
            },
          ],
        },
      },
      {
        type: "spawnShape",
        config: {
          type: "torus",
          data: {
            x: 0,
            y: 0,
            radius: 5,
            innerRadius: 0,
            affectRotation: false,
          },
        },
      },
    ],
  };
  const emiter = new particles.Emitter(container, pConfig);
  const emiter2 = new particles.Emitter(container, pConfig2);

  app.ticker.add((delta) => {
    emiter.update(delta * 0.005);
    emiter2.update(delta * 0.005);
  });

  (<HTMLInputElement>document.querySelector("#start")).onclick = () => {
    emiter.emit = true;
    emiter2.emit = true;
  };
  const stop = (<HTMLInputElement>document.querySelector("#stop"));
  stop.onclick = () => {
    emiter.emit = false;
    emiter2.emit = false;
  };
  const controlsDiv = (<HTMLInputElement>document.querySelector("#controls"));
  gsap.fromTo(controlsDiv, {top:0}, {top:700, duration:5, ease: "bounce.out", repeat:-1, yoyo:true, repeatDelay:2, yoyoEase: 'elastic.out'});
});
