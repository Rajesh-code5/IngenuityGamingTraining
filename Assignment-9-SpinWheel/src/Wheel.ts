import { Container } from "@pixi/display";
import { Slice } from "./Slice";

export class Wheel extends Container {
  constructor(
    private radius: number,
    private sliceDegree: number,
    private sliceColors: number[],
    private prizes: string[]
  ) {
    super();
    const slices = [];
    for (let i = 0; i < this.sliceColors.length; i++) {
      const slice = new Slice(
        i,
        this.radius,
        this.sliceDegree,
        this.sliceColors[i],
        this.prizes[i]
      );
      slices.push(slice);
      this.addChild(slice);
    }
  }
}