import { Module } from "@nestjs/common";
import { LinksService } from "./links.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Link } from "./entities/link.entity";
import { LinksController } from './links.controller';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Link])],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
