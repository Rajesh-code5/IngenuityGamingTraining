import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { DEG_TO_RAD } from "@pixi/math";
import {Text} from "@pixi/text";

export class Slice extends Container {
  constructor(
    count: number,
    radius: number,
    sliceDegree: number,
    sliceColor: number,
    prize: string
  ) {
    super();
    const g = new Graphics();
    g.beginFill(sliceColor);
    g.lineStyle(1, sliceColor);
    g.moveTo(0, 0);
    g.arc(
      0,
      0,
      radius,
      DEG_TO_RAD * (270 + count * sliceDegree),
      DEG_TO_RAD * (270 + (count + 1) * sliceDegree)
    );
    g.closePath();
    g.endFill();

    const text = new Text(prize, {align:"right"})
    text.pivot.set(-75, 16);
    text.rotation = DEG_TO_RAD * (270 + count * sliceDegree + sliceDegree / 2);
    this.addChild(g, text);
  }
}