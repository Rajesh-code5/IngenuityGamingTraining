import {Application, BitmapText, Text, Graphics} from "pixi.js";
import {Loader} from "./Loader";
import {Game} from "./Game";
const app = new Application({
    width: 1200,
    height: 720,
    view: document.getElementById("my-canvas") as HTMLCanvasElement,
    backgroundColor: 0x00BFFF,
    antialias: true,
})
const loader = new Loader();
loader.start((l,r) => {
    const game = new Game();
    game.x = app.screen.width / 2;
    game.y = app.screen.height / 2;
    game.create();
    app.stage.addChild(game);
    app.stage.interactive = true;
    app.stage.on("pointerdown",(e)=>{
        game.spin();
    });
});
