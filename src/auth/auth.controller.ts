import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Post, Body, Get, Param } from '@nestjs/common';
import { authDto } from './dto/user.dto';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { LinksService } from 'src/links/links.service';
import { AuthGuard } from 'src/common/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private linksService: LinksService
  ) {}

  @Post('signup')
  async create(@Body() data: CreateUserDto) {
    try {
      const isCreated = await this.userService.createUser(data);

      return {
        status: HttpStatus.CREATED,
        message: isCreated,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        name: error.name || 'BadRequest',
        message: error.message || 'Bad Request',
      });
    }
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    const isFound = this.userService.findOneUser(username);
    return isFound;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() data: authDto) {
    try {
      const token = await this.authService.signIn(data);

      return {
        status: HttpStatus.OK,
        message: token,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        name: error.name,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('get-all-links/:username')
  async getAllLinks(@Param('username') username: string) {
    try {
      const response = await this.linksService.findAllByUsername(username);
      return {
        status: HttpStatus.OK,
        data: response,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        name: error.name,
        message: error.message,
      });
    }
  }
}
