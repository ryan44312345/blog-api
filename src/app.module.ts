import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/user.module';
import { PostModule } from './modules/posts/post.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

