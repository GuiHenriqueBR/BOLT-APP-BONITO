import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id/subcategories')
  async getSubcategories(@Param('id') id: number) {
    return this.categoriesService.getSubcategories(id);
  }
}