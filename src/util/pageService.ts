import { GraphQLClient } from '@util/graphQLClient';
import { GET_ALL_PAGES, GET_PAGE_BY_SLUG } from '@util/pageQueries';
import type { Page, Pages } from '@domain/page';

export class PageService {
  private static client = GraphQLClient.Instance();

  static async getAllPages(): Promise<Pages> {
    return this.client.request<Pages>(GET_ALL_PAGES);
  }

  static async getPageBySlug(slug: string): Promise<{ page: Page }> {
    return this.client.request<{ page: Page }>(GET_PAGE_BY_SLUG, { slug });
  }
}