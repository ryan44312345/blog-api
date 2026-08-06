import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email)

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas.')
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        const payload = { sub:user.id, email: user.email }

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}