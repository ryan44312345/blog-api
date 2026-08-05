import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";



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

        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: dto.password,
                role: dto.role,
            },
        })
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

    async update(id: string, data: UpdateUserDto) {
        
        const usuarioAtualizado = await this.prisma.user.update({
            where: { id: id },
            data:  data
        })

        return usuarioAtualizado;
    }


}