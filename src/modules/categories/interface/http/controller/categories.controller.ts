import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from '@/modules/categories/application/services/categories.service';
import {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
  CategoryResponseDto,
} from '../dto/category.dto';
import { ResponseDto } from '@/common/dto/response.dto';

@Controller('categories') // endpoint: /<SERVICE_PREFIX>/categories
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Post()
  create(
    @Body() req: CreateCategoryRequestDto,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    return this.service.create(req);
  }

  @Get()
  findAll(): Promise<ResponseDto<CategoryResponseDto[]>> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseDto<CategoryResponseDto>> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() req: UpdateCategoryRequestDto,
  ): Promise<ResponseDto<CategoryResponseDto>> {
    return this.service.update(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseDto<any>> {
    return this.service.remove(id);
  }
}
