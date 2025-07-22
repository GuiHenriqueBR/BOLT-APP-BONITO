import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Subcategory } from '../entities/subcategory.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly catRepo: Repository<Category>,
    @InjectRepository(Subcategory) private readonly subcatRepo: Repository<Subcategory>,
  ) {}

  async getCategories() {
    return this.catRepo.find();
  }

  async getSubcategories(categoryId: number) {
    return this.subcatRepo.find({ where: { category: { id: categoryId } } });
  }
}