import type {
    ITextItems,
    TImageFormats,
    TMeta,
    TSeo,
    UploadFileEntityResponse,
} from '~/types/global.type'
import type { DoctorItem } from '~/types/services.type'

export interface DoctorsPage {
    doctorsListing: {
        __typename: 'DoctorsListingEntityResponse'
        data: {
            __typename: 'DoctorsListingEntity'
            attributes: {
                __typename: 'DoctorsListing'
                title: string
                seo?: TSeo
                doctors: {
                    __typename: 'DoctorsListing'
                    data: DoctorItem[]
                    meta: TMeta
                }
            }
        }
    }
}

export interface DoctorsPosts {
    doctors: {
        __typename: 'DoctorEntityResponseCollection'
        meta: TMeta
        data: DoctorItem[]
    }
}
export interface ICert {
    id: string
    attributes: {
        formats: TImageFormats
        caption: string
        alternativeText?: string
    }
}
export interface IDoctor {
    __typename: 'Doctor'
    name: string
    slug: string
    specification: string
    experience: string
    clinicAddress: string
    education: ITextItems[]
    information: string
    seo?: TSeo
    image?: UploadFileEntityResponse
    certs: {
        __typename: 'UploadFileRelationResponseCollection'
        data: ICert[]
    }
    sub_services: {
        __typename: 'SubServiceRelationResponseCollection'
        data: {
            __typename: 'SubServiceEntity'
            id: string
            attributes: {
                title: string
                slug: string
                service: {
                    data: {
                        attributes: {
                            slug: string
                        }
                    }
                }
            }
        }[]
    }
}
export interface DoctorPage {
    doctors: {
        __typename: 'DoctorEntityResponseCollection'
        data: {
            __typename: 'DoctorEntity'
            id: string
            attributes: IDoctor
        }[]
    }
}
