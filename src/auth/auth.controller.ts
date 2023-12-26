import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { createUserDto } from "src/users/dto/createUserDto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Post("signup")
  create(@Body() body: createUserDto) {
    return this.userService.create(body);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    const isFound = this.userService.findOne(id);
    return isFound;
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
