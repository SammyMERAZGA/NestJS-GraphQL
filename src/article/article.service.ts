import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/article-create.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto/article-update.dto';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async articleCreate(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
    const article = this.articleRepository.create(input);
    await article.save();
    return { article };
  }

  async articleUpdate(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const article = await this.articleRepository.findOneOrFail(articleId);
    article.title = input.title;
    article.description = input.description;
    article.image = input.image;
    await article.save();
    return { article };
  }
}
