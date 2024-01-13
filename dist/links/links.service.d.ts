import { CreateLinkDto } from './dto/create-link.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
export declare class LinksService {
    private configService;
    private readonly linkRepository;
    constructor(configService: ConfigService, linkRepository: Repository<Link>);
    create(createLinkDto: CreateLinkDto): Promise<Link>;
    findOne(shortId: string): Promise<Link>;
    updateClicks(shortId: string): Promise<void>;
    findAllByUsername(username: string): Promise<Link[]>;
}
