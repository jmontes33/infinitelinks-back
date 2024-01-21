import { HttpStatus } from '@nestjs/common';
import { CreateLinkDto } from 'src/links/dto/create-link.dto';
import { LinksService } from 'src/links/links.service';
export declare class AuthController {
    private linksService;
    constructor(linksService: LinksService);
    shortUrl(data: CreateLinkDto): Promise<{
        status: HttpStatus;
        data: import("../links/entities/link.entity").Link;
    }>;
}
