"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const link_entity_1 = require("./entities/link.entity");
let LinksService = class LinksService {
    constructor(configService, linkRepository) {
        this.configService = configService;
        this.linkRepository = linkRepository;
    }
    async create(createLinkDto) {
        try {
            let shortUrlToUse;
            if (createLinkDto.shortUrl) {
                const existingLink = await this.linkRepository.findOne({
                    where: { shortId: createLinkDto.shortUrl },
                });
                if (existingLink) {
                    throw new Error('Short URL is already in use');
                }
                shortUrlToUse = createLinkDto.shortUrl;
            }
            else {
                let urlId = (0, nanoid_1.nanoid)(8);
                const existingLink = await this.linkRepository.findOne({
                    where: { shortId: urlId },
                });
                if (existingLink) {
                    urlId = (0, nanoid_1.nanoid)(8);
                }
                shortUrlToUse = urlId;
            }
            const data = new link_entity_1.Link();
            const base = this.configService.get('BASE_URL');
            data.username = createLinkDto.username;
            data.shortId = shortUrlToUse;
            data.originalUrl = createLinkDto.originalUrl;
            data.shortUrl = `${base}/${shortUrlToUse}`;
            data.clicks = 0;
            data.state = 'Active';
            return this.linkRepository.save(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(shortId) {
        return this.linkRepository.findOneBy({ shortId });
    }
    async updateClicks(shortId) {
        await this.linkRepository
            .createQueryBuilder()
            .update(link_entity_1.Link)
            .set({ clicks: () => 'clicks + 1' })
            .where('shortId = :shortId', { shortId })
            .execute();
    }
    async findAllByUsername(username) {
        return this.linkRepository.find({ where: { username } });
    }
};
exports.LinksService = LinksService;
exports.LinksService = LinksService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(link_entity_1.Link)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository])
], LinksService);
//# sourceMappingURL=links.service.js.map