import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreatePostDto) {
        const post = await this.prisma.post.create({
            data: {
                title: dto.title,
                content: dto.content,
                published: true,
                user: {
                    connect: { id: dto.userId },
                },
            },
            select: {
                id: true,
                title: true,
                content: true,
                user: true,
            },
        });

        return post;
    }

    async findAll() {
        return this.prisma.post.findMany();
    }

    async findOne(id: string) {
        const post = await this.prisma.post.findUnique({
            where: { id }
        })

        if (!post) {
            throw new NotFoundException("Post não encontrado.")
        }
        return post;    
    }

    async update(id: string, data: UpdatePostDto) {
        const postAtualizado = await this.prisma.post.update({
            where: { id: id },
            data: data
        })

        return postAtualizado
    }

    async delete(id: string) {
        const postDelete = await this.prisma.post.delete({
            where: {id: id}
        })

        return postDelete;
    }
}