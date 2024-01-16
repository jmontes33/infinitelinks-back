import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';

@Injectable()
export class LinksService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>
  ) {}

  async create(createLinkDto: CreateLinkDto): Promise<Link> {
    try {
      let shortUrlToUse: string;

      if (createLinkDto.shortUrl) {
        const existingLink = await this.linkRepository.findOne({
          where: { shortId: createLinkDto.shortUrl },
        });

        if (existingLink) {
          throw new Error('Short URL is already in use');
        }

        shortUrlToUse = createLinkDto.shortUrl;
      } else {
        let urlId = nanoid(8);

        const existingLink = await this.linkRepository.findOne({
          where: { shortId: urlId },
        });

        if (existingLink) {
          urlId = nanoid(8);
        }

        shortUrlToUse = urlId;
      }

      const data: Link = new Link();

      const base = this.configService.get<string>('BASE_URL');

      data.username = createLinkDto.username;
      data.shortId = shortUrlToUse;
      data.originalUrl = createLinkDto.originalUrl;
      data.shortUrl = `${base}${shortUrlToUse}`;
      data.clicks = 0;
      data.state = 'Active';

      return this.linkRepository.save(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(shortId: string): Promise<Link> {
    return this.linkRepository.findOneBy({ shortId });
  }

  async updateClicks(shortId: string): Promise<void> {
    await this.linkRepository
      .createQueryBuilder()
      .update(Link)
      .set({ clicks: () => 'clicks + 1' })
      .where('shortId = :shortId', { shortId })
      .execute();
  }

  async findAllByUsername(username: string) {
    return this.linkRepository.find({ where: { username } });
  }
}
