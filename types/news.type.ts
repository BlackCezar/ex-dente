import type {
    NewsBodyItem,
    TSeo,
    UploadFileEntityResponse,
} from '~/types/global.type'

export interface NewsPageItem {
    __typename: 'NewsPostEntity'
    id: string
    attributes: {
        __typename: 'NewsPost'
        publishedAt: string
        avatar?: UploadFileEntityResponse
        title: string
        slug: string
        seo?: TSeo
        description?: string
        body: NewsBodyItem[]
    }
}
export interface NewsPage {
    newsPosts: {
        __typename: 'NewsPostEntityResponseCollection'
        data: NewsPageItem[]
    }
}
