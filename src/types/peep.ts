export interface PeepConfig {
  src: string;
  rows: number;
  cols: number;
}

export interface Stage {
  width: number;
  height: number;
}

export interface PeepProps {
  startX: number;
  startY: number;
  endX: number;
}

export interface WalkParams {
  peep: Peep;
  props: PeepProps;
}

export class Peep {
  image: HTMLImageElement;
  rect: number[];
  width: number;
  height: number;
  x: number = 0;
  y: number = 0;
  anchorY: number = 0;
  scaleX: number = 1;
  walk: any = null;

  constructor({ image, rect }: { image: HTMLImageElement; rect: number[] }) {
    this.image = image;
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, 1);
    ctx.drawImage(
      this.image,
      this.rect[0],
      this.rect[1],
      this.rect[2],
      this.rect[3],
      0,
      0,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
