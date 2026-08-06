import {IsEmail, IsNotEmpty, IsOptional, IsEnum, IsString, MinLength} from 'class-validator' 
import { Role } from '@prisma/client'

export class CreateUserDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    name: string;

    @IsEmail({}, { message: 'Forneça um e-mail válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password: string;

    @IsEnum(Role, { message: 'A role fornecida é inválida.' })
    @IsOptional()
    role?: Role;
}