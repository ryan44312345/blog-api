import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        if (userExists) {
            throw new ConflictException('Este e-mail já está cadastrado.')
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(dto.password, salt)

        const user = this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: passwordHash,
                role: dto.role,
            },
            select: {
                name: true,
                email: true,
                role: true,
            }
        })

        return user;
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique(
            { where: { id } }
        )
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        return user;
    }

    async update(id: string, data: UpdateUserDto) {

        const usuarioAtualizado = await this.prisma.user.update({
            where: { id: id },
            data: data
        })

        return usuarioAtualizado;
    }

    async delete(id: string) {
        const usuario = await this.prisma.user.delete({
            where: { id: id }
        })

        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado")
        }

        return usuario;

    }
}