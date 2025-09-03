import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from '@/modules/posts/application/services/posts.service';
import {
  CreatePostRequestDto,
  PostResponseDto,
  UpdatePostRequestDto,
} from '../dto/post.dto';
import { ResponseDto } from '@/common/dto/response.dto';

@Controller('posts') // => /<SERVICE_PREFIX>/posts
export class PostsController {
  constructor(private service: PostsService) {}

  @Post()
  create(
    @Body() req: CreatePostRequestDto,
  ): Promise<ResponseDto<PostResponseDto>> {
    return this.service.create(req);
  }

  @Get()
  findAll(): Promise<ResponseDto<PostResponseDto[]>> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseDto<PostResponseDto>> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() req: UpdatePostRequestDto,
  ): Promise<ResponseDto<PostResponseDto>> {
    return this.service.update(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseDto<any>> {
    return this.service.remove(id);
  }
}
