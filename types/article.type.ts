import type {TMeta, TSeo} from './global.type'

export interface IArticleQuery {
    articlePage: {
        __typename: 'ArticlePageEntityResponse'
        data: {
            __typename: 'ArticlePageEntity'э
            attributes: {
                __typename: 'ArticlePage'
                title: string
                seo?: TSeo
            }
        }
    }
}

export interface IArticlePage {
    articles: {
        data: {
            attributes: IArticle
        }[]
    }
} 

export interface IArticle {
    title: string
    slug: string
    publishedAt: string
    description: string
    banner: {
        data: {
            id: string
            attributes: {
                alternativeText?: string
                caption?: string
                url: string
            }
        }
    }
    content: ITextItems[]
    seo?: TSeo
}
export interface IArticlePostsQuery {
    articles: {
        meta: TMeta
        data: {
            id: string
            attributes: Omit<IArticle, 'seo' | 'content'>
        }[]
    }
}