import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Public } from "../auth/constants";
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Public()
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Public()
    @Get(':id')
    async finOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Public()
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto 
    ) {
        return this.usersService.update(id, updateUserDto)
    }

    @Public()
    @Delete(':id')
    async delete(
        @Param('id') id: string
    ) {
        return this.usersService.delete(id)
    }
}