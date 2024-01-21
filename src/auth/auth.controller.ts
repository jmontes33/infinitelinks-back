import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Post, Body, Get, Param } from '@nestjs/common';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { LinksService } from 'src/links/links.service';
@Controller('auth')
export class AuthController {
  constructor(
    private linksService: LinksService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('short-url')
  async shortUrl(@Body() data: CreateLinkDto) {
    try {
      const response = await this.linksService.create(data);
      return {
        status: HttpStatus.OK,
        data: response,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        name: error.name || 'BadRequest',
        message: error.message || 'Bad Request',
      });
    }
  }
}
