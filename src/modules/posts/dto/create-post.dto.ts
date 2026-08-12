import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsString({ message: 'Titlo deve ser uma string' })
    @IsNotEmpty({ message: 'Ele não pode estar vazio' })
    title: string

    @IsString({ message: 'Titlo deve ser uma string' })
    @IsNotEmpty({ message: 'Ele não pode estar vazio' })
    content: string

    published: boolean

    @IsString({ message: 'Titlo deve ser uma string' })
    @IsNotEmpty({ message: 'Ele não pode estar vazio' })
    userId: string
}