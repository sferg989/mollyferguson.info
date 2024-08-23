import { GraphQLClient as GQ } from 'graphql-request'

export class GraphQLClient {
  private static instance: GraphQLClient | null = null
  private client: GQ

  private constructor() {
    const endpoint = import.meta.env.ASTRO_HYGRAPH_ENDPOINT
    if (!endpoint) {
      throw new Error('ASTRO_HYGRAPH_ENDPOINT is not defined')
    }
    this.client = new GQ(endpoint)
  }

  public static Instance(): GraphQLClient {
    if (!this.instance) {
      this.instance = new GraphQLClient()
    }
    return this.instance
  }

  public async request<T>(
    query: string,
    variables?: Record<string, any>
  ): Promise<T> {
    return this.client.request<T>(query, variables)
  }
}
