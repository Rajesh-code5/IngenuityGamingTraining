import {
  Container, Sprite, Texture, BaseTexture, Rectangle,
} from 'pixi.js';
import { getResource, getTexture } from './Textures';

export type CardFrame = {
  name:string;
  frame:number[]
};

export type CardFront = {id:string, frame:CardFrame};
export const cardFrames: CardFrame[] = [];
export const CARD_WIDTH = 150;
export const CARD_HEIGHT = 150;
for (let c = 0; c < 4; c++) {
  for (let r = 0; r < 6; r++) {
    for (let i = 0; i < 2; i++) {
      cardFrames.push({
        name: `card-${c}-${r}`,
        frame: [CARD_WIDTH * c, CARD_HEIGHT * r, CARD_WIDTH, CARD_HEIGHT],
      });
    }
  }
}

export class Card extends Container {
  public back:Sprite;

  public front:Sprite;

  public name: string;

  constructor(back: string, front:CardFront) {
    super();
    const frontTexture = this.getFrontTexture(front);
    this.front = this.createSprite(frontTexture);
    this.back = this.createSprite(getTexture(back) as Texture);
    this.name = front.frame.name;

    this.interactive = true;
    this.buttonMode = true;
  }

  private createSprite(texture:Texture): Sprite {
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.width = CARD_WIDTH;
    sprite.height = CARD_HEIGHT;
    this.addChild(sprite);
    return sprite;
  }

  private getFrontTexture(data:CardFront): Texture {
    const baseTexture = new BaseTexture(getResource(data.id).url);
    const frameRect = new Rectangle(...data.frame.frame);
    return new Texture(baseTexture, frameRect);
  }
}
