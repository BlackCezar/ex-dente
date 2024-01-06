import type {
    IComponentTextText,
    TMeta,
    TSeo,
    UploadFileEntityResponse,
} from '~/types/global.type'

export interface SalesQuery {
    promoListing: {
        __typename: 'PromoListingEntityResponse'
        data: {
            __typename: 'PromoListingEntity'
            attributes: {
                __typename: 'PromoListing'
                title: string
                seo?: TSeo
            }
        }
    }
}

export interface IPromo {
    slug?: string
    subtitle: string
    title: string
    seo?: TSeo
    description: IComponentTextText[]
    image?: UploadFileEntityResponse
}
export interface SalePost {
    __typename: 'PromoEntity'
    id: string
    attributes: Pick<IPromo, 'slug' | 'subtitle' | 'title' | 'image'>
}
export interface SalesPosts {
    promos: {
        __typename: 'PromoEntityResponseCollection'
        data: SalePost[]
        meta: TMeta
    }
}

export interface SalePage {
    promos: {
        __typename: 'PromoEntityResponseCollection'
        data: {
            id: string
            __typename: 'PromoEntity'
            attributes: IPromo
        }[]
    }
}
