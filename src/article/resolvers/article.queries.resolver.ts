import { ArticleService } from './../article.service';
import { Article } from './../models/article.model';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [Article])
  async articlesList() {
    return this.articleService.articleList();
  }
}
