import { Module } from "@nestjs/common";
import { UsersModule } from "../user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'chave_secreta_provisoria',
            signOptions: { expiresIn: '1d' }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}