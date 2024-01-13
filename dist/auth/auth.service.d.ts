import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { authDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService);
    signIn(data: authDto): Promise<any>;
}
