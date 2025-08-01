import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Subcategory } from '../entities/subcategory.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Subcategory])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}