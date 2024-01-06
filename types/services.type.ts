import type {
    IService,
    ITextItems,
    TData,
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
