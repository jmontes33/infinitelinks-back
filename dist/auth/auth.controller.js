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
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const common_2 = require("@nestjs/common");
const create_link_dto_1 = require("../links/dto/create-link.dto");
const links_service_1 = require("../links/links.service");
const auth_guard_1 = require("../common/auth.guard");
const common_3 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(userService, authService, linksService) {
        this.userService = userService;
        this.authService = authService;
        this.linksService = linksService;
    }
    async create(data) {
        try {
            const isCreated = await this.userService.createUser(data);
            return {
                status: common_1.HttpStatus.CREATED,
                message: isCreated,
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
    findOne(username) {
        const isFound = this.userService.findOneUser(username);
        return isFound;
    }
    async signIn(data) {
        try {
            const token = await this.authService.signIn(data);
            return {
                status: common_1.HttpStatus.OK,
                message: token,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                name: error.name,
                message: error.message,
            });
        }
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
    async getAllLinks(username) {
        try {
            const response = await this.linksService.findAllByUsername(username);
            return {
                status: common_1.HttpStatus.OK,
                data: response,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({
                status: common_1.HttpStatus.BAD_REQUEST,
                name: error.name,
                message: error.message,
            });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_2.Post)('signup'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_2.Get)(':username'),
    __param(0, (0, common_2.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_2.Post)('login'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_3.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_2.Post)('short-url'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_link_dto_1.CreateLinkDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "shortUrl", null);
__decorate([
    (0, common_3.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_2.Get)('get-all-links/:username'),
    __param(0, (0, common_2.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllLinks", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        links_service_1.LinksService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map