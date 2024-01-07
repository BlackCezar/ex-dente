import type {
    IService,
    ITextItems,
    PriceSection,
    PriceSectionEntity,
    TData,
    TImageFormats,
    TSeo,
    UploadFileEntityResponse,
} from '~/types/global.type'

export interface DoctorItem {
    __typename: 'DoctorEntity'
    id: string
    attributes: {
        __typename: 'Doctor'
        specification: string
        slug: string
        name: string
        image: UploadFileEntityResponse
    }
}

export interface ServiceItem {
    __typename: 'ServiceEntity'
    id: string
    attributes: {
        __typename: 'Service'
        slug: string
        seo?: TSeo
        subtitle: string
        title: string
        description: ITextItems[]
        doctors: {
            __typename: 'DoctorRelationResponseCollection'
            data: DoctorItem[]
        }
        sub_services: {
            __typename: string
            data: {
                id: string
                __typename: 'SubServiceEntity'
                attributes: Pick<IService, 'slug' | 'title'>
            }[]
        }
    }
}
export interface ServicePage {
    services: {
        data: ServiceItem[]
    }
}

export interface SubServiceEntity {
    __typename: 'SubServiceEntity'
    attributes: {
        __typename: 'SubService'
        title: string
        slug: string
        subtitle: string
        seo?: TSeo
        doctors: {
            __typename: 'DoctorRelationResponseCollection'
            data: DoctorItem[]
        }
        description: ITextItems[]
        image: {
            __typename: 'UploadFileRelationResponseCollection'
            data: {
                __typename: 'UploadFileEntity'
                id: string
                attributes: {
                    __typename: 'UploadFile'
                    alternativeText?: string
                    caption?: string
                    url: string
                }
            }[]
        }
        price_sections: {
            __typename: 'PriceSectionRelationResponseCollection'
            data: PriceSectionEntity[]
        }
        service: {
            __typename: 'ServiceEntityResponse'
            data?: {
                __typename: 'ServiceEntity'
                attributes: {
                    __typename: 'Service'
                    title: string
                    slug: string
                }
            }
        }
        galary?: {
            __typename: 'ComponentSlidersSlider'
            label?: string
            id?: string
            banner: {
                __typename: 'UploadFileRelationResponseCollection'
                data: GalleryBannerItem[]
            }
        }
    }
}

export interface GalleryBannerItem {
    __typename: 'UploadFileEntity'
    id: string
    attributes: {
        __typename: 'UploadFile'
        alternativeText?: string
        caption?: string
        formats: TImageFormats
    }
}

export interface SubServicePage {
    subServices: {
        __typename: 'SubServiceEntityResponseCollection'
        data: SubServiceEntity[]
    }
}

export interface SubServicesList {
    subServices: {
        __typename: 'SubServiceEntityResponseCollection'
        data: {
            __typename: 'SubServiceEntity'
            attributes: {
                __typename: 'SubService'
                title: string
                slug: string
            }
        }[]
    }
}
