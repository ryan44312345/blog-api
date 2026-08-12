import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../user.service";
import * as bcrypt from "bcrypt";



@Injectable()
export class AuthService {
    constructor(private readonly usersServices: UsersService) {}

    async signIn(email: string, password: string) {
        const user = await this.usersServices.findOne(email);
        if (!bcrypt.compare(user?.password,  password)) {
            throw new UnauthorizedException("Senha inválida")
        }

        const { user?.passoword, ...result } = user;
    }
}