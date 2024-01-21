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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const create_link_dto_1 = require("../links/dto/create-link.dto");
const links_service_1 = require("../links/links.service");
let AuthController = class AuthController {
    constructor(linksService) {
        this.linksService = linksService;
    }
    async shortUrl(data) {
        try {
            const response = await this.linksService.create(data);
            return {
                status: common_1.HttpStatus.OK,
                data: response,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                name: error.name || 'BadRequest',
                message: error.message || 'Bad Request',
            });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_2.Post)('short-url'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_link_dto_1.CreateLinkDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "shortUrl", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [links_service_1.LinksService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map