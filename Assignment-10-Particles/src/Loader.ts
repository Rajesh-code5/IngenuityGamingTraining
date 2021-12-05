import {
  Loader as pixiLoader,
  LoaderResource,
  Texture,
  Rectangle,
} from "pixi.js";
import assets from "./assets.json";
export class Loader {
  private readonly _loader: pixiLoader;
  private readonly _loaderDiv: HTMLDivElement;
  private static resources: { [key: string]: LoaderResource };

  public static getResource(name: string): LoaderResource {
    return this.resources[name];
  }

  public static getTexture(name: string): Texture {
    return this.resources[name].texture;
  }

  public static getTextureFromSpritesheet(
    name: string,
    frame: Rectangle
  ): Texture {
    const bt = this.resources[name].texture.baseTexture;
    return new Texture(bt, frame);
  }

  public static getTexturesFromSpritesheet(
    name: string,
    frames: Rectangle[]
  ): Texture[] {
    const bt = this.resources[name].texture.baseTexture;
    let textures: Texture[] = [];
    frames.forEach((frame) => {
      textures.push(new Texture(bt, frame));
    });
    return textures;
  }

  constructor() {
    this._loader = new pixiLoader();
    this._loaderDiv = document.querySelector("#loader") as HTMLDivElement;
    this._loader.onProgress.add((e) => {
      this.progress(e.progress);
    });
    this._loader.onComplete.add((e) => {
      this._loaderDiv.remove();
      Loader.resources = e.resources;
    });
  }
  start(cb: (l: pixiLoader, r: any) => void): void {
    this._loader.add(assets);
    this._loader.load(cb);
  }
  private progress(p: number): void {
    console.log("progress:", p);
    this._loaderDiv.style.width = `${p}%`;
  }
}
