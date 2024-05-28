import { Injectable, PipeTransform } from "@nestjs/common";
import * as path from "path";
import * as sharp from "sharp";

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File, Promise<string>> {
  async transform(image: Express.Multer.File): Promise<string> {
    const sharpInstance = sharp(image.buffer);

    const originalName = image.originalname;
    const filename = Date.now() + '-' + originalName + '.webp';

    const { width, height } = await sharpInstance.metadata();
    // TODO: placeholder. get from frontend
    const tileSize = 16;
    const tilesCount = (height / tileSize) * (width / tileSize);
    await sharp({
      create: {
        width: tileSize,
        height: tileSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
      }
    })
      .png()
      .toFile(path.join('uploads', '0.png'));

    let x = 0;
    let y = 0;
    for (let i = 0; i < tilesCount; i++) {

      const tileName = `${i + 1}.png`;
      const outputTilePath = path.join('uploads', tileName);
      await sharp(image.buffer).extract({ left: x, top: y, width: tileSize, height: tileSize })
        .toFile(outputTilePath);

      x += tileSize;
      if (x >= width) {
        x = 0;
        y += tileSize;
      }
    }

    return filename;
  }
}
