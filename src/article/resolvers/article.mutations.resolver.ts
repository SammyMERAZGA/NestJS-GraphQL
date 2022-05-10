import { Args, Mutation, Resolver, ID } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';
import {
  ArticleUpdateOutput,
  ArticleUpdateInput,
} from '../dto/article-update.dto';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from '../dto/article-create.dto';

@Resolver(Article)
export class ArticleMutationsResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleCreateOutput)
  async articleCreate(@Args('input') input: ArticleCreateInput) {
    return this.articleService.articleCreate(input);
  }

  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.articleUpdate(articleId, input);
  }
}
