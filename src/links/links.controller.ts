import {
  Controller,
  Get,
  Param,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LinksService } from './links.service';

@Controller('')
export class LinksController {
  constructor(private linksService: LinksService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':shortId')
  async redirectUrl(@Param('shortId') shortId: string, @Res() res: Response) {
    try {
      const url = await this.linksService.findOne(shortId);
      if (url) {
        await this.linksService.updateClicks(shortId);
        return res.redirect(url.originalUrl);
      } else {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Url not found',
        });
      }
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        name: error.name,
        message: error.message,
      });
    }
  }
}
