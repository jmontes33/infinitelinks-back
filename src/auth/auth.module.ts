import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { LinksModule } from "src/links/links.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    LinksModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
})
export class AuthModule {}
