import { HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { authDto } from './dto/user.dto';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { LinksService } from 'src/links/links.service';
export declare class AuthController {
    private userService;
    private authService;
    private linksService;
    constructor(userService: UsersService, authService: AuthService, linksService: LinksService);
    create(data: CreateUserDto): Promise<{
        status: HttpStatus;
        message: import("../users/entities/user.entity").Users;
    }>;
    findOne(username: string): Promise<import("../users/entities/user.entity").Users>;
    signIn(data: authDto): Promise<{
        status: HttpStatus;
        message: any;
    }>;
    shortUrl(data: CreateLinkDto): Promise<{
        status: HttpStatus;
        data: import("../links/entities/link.entity").Link;
    }>;
    getAllLinks(username: string): Promise<{
        status: HttpStatus;
        data: import("../links/entities/link.entity").Link[];
    }>;
}
