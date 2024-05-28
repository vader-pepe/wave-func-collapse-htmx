import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { SharpPipe } from "./sharp.pipe";

@Controller('image')
export class ImageController {

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  processImage(@UploadedFile(SharpPipe) file: Express.Multer.File) {
    console.log(file);

    return 'this from image controller'
  }
}
