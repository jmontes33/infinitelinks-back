import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = this.userService.findOne(username);

    if (!user || !(await bcrypt.compare(pass, (await user).password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: (await user).id, username: (await user).username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
