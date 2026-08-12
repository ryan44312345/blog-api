import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";



@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async create(@Body() createPostDto: CreatePostDto){
        return this.postService.create(createPostDto)
    }
    
    @Get()
    async findAll() {
        return this.postService.findAll();
    }

    @Get()
    async findOne(@Param('id') id: string) {
        return this.postService.findOne(id)
    }
}