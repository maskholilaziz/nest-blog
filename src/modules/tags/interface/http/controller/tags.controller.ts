import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TagsService } from '@/modules/tags/application/services/tags.service';
import {
  CreateTagRequestDto,
  UpdateTagRequestDto,
  TagResponseDto,
} from '../dto/tag.dto';
import { ResponseDto } from '@/common/dto/response.dto';

@Controller('tags') // endpoint: /<SERVICE_PREFIX>/tags
export class TagsController {
  constructor(private service: TagsService) {}

  @Post()
  create(
    @Body() req: CreateTagRequestDto,
  ): Promise<ResponseDto<TagResponseDto>> {
    return this.service.create(req);
  }

  @Get()
  findAll(): Promise<ResponseDto<TagResponseDto[]>> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseDto<TagResponseDto>> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() req: UpdateTagRequestDto,
  ): Promise<ResponseDto<TagResponseDto>> {
    return this.service.update(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseDto<any>> {
    return this.service.remove(id);
  }
}
