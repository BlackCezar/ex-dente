import type { DoctorItem } from '~/types/services.type'


export enum RequestType {
    Doctor = 'Zapisatsya_k_vrachu',
    Resume = 'Otpravit_rezyume',
    Question = 'Zadat_vopros'
}
export interface MenuTest {
    __typename: string
    data: TData<IMenu>
}

export interface TData<T> {
    __typename: string
    attributes: T
}

export interface IMenu {
    __typename: string
    body: ILink[]
}

export interface ISection {
    label: string
    url?: string
    links: ILink[]
}

export interface Sections {
    __typename?: string
    data?: TData<ISection>[]
}

export interface ILink {
    __typename?: string
    label?: string
    url?: string
    style?: string
    sections?: Sections
}

export interface MainMenu {
    menuTest?: MenuTest
}

export interface CommonConfig {
    commonConfig: CommonConfigClass
}

export interface CommonConfigClass {
    __typename: string
    data: TData<IConfig> | null
}

export interface GlobalStore {
    config: null | CommonConfig
    mainMenu: null | MainMenu
    services: ServicesItem[]
    clinics: Clinics['clinics']['data']
    doctors: DoctorItem[]
}

export interface IConfig {
    address: string
    cookiesAnnouncement: boolean
    cookiesLifetimeDays: number
    defaultSharedImage: {
        __typename: string
        data: null | IImage[]
    }
    email: string
    phoneNumber: string
    company: string
    name: string
    description: string
    googleReCaptchaToken: string | null
    logo: {
        logoDark: {
            __typename: string
            data: IImage[] | null
        }
        logoLight: {
            __typename: string
            data: IImage[] | null
        }
    }[]
}

export interface IImage
    extends TData<{
        __typename: string
        url: string
    }> { }

export interface Header {
    header: {
        __typename: string
        data: TData<{
            __typename: string
            title: string
            request_button: {
                __typename: string
                url: any
                style: string
                label: string
            }[]
        }> | null
    }
}

export type UploadFileEntityResponse = {
    __typename: 'UploadFileEntityResponse'
    data?: {
        __typename: 'UploadFileEntity'
        attributes: {
            formats: TImageFormats
            caption?: string
            alternativeText?: string
        }
    }
}

export interface TSeo {
    __typename: 'ComponentSharedSeo'
    keywords: string
    metaDescription: string
    metaTitle: string
    preventIndexing: boolean
    sharedImage?: {
        __typename: 'ComponentSharedSharedImage'
        alt: string
        media?: {
            data?: {
                attributes: {
                    url: string
                }
            }
        }
    }
}

export interface TSlide {
    __typename: string
    bgColor: string
    button: {
        __typename: string
        label: string
        style: string
        url: string
    } | null
    videoUrl: string | null
    title: string
    subtitle: string
    isLight: boolean
    image: {
        __typename: string
        data: {
            attributes: {
                __typename: string
                formats: TImageFormats
                caption: string | null
            }
        }
    } | null
}

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
    children?: SelectOption[]
}

export interface Clinics {
    clinics: {
        data: {
            id: string
            attributes: {
                label: string
                address: string
            }
        }[]
    }
}

export interface HomePage {
    homePage: {
        __typename: string
        data: {
            __typename: string
            attributes: {
                title: string
                h1: string
                seoText?: string
                seo: TSeo
                slider: TSlide[]
            }
        }
    }
}

export interface IService {
    __typename: string
    title: string
    slug: string
    sub_services: {
        __typename: string
        data: {
            id: string
            attributes: IService
        }[]
    }
}

export interface ServicesItem {
    __typename: string
    id: string
    attributes: IService
}

export interface Services {
    services: {
        __typename: string
        data: ServicesItem[]
    }
}

export interface IHomePageBenefitSlide {
    id: string
    label: string
    style: string
    banner: {
        __typename: string
        data: {
            __typename: string
            id: string
            attributes: {
                formats: TImageFormats | null
                alternativeText: string | null
                caption: string | null
            }
        }[]
    } | null
}

export interface ComponentPricePrice {
    __typename: 'ComponentPricePrice'
    price: number
    description: string
    id: string
    style?: string
}

export interface PriceSectionEntity {
    __typename: 'PriceSectionEntity'
    id: string
    attributes: PriceSection
}

export interface ReviewsPage {
    straniczaOtzyvov: {
        data: {
            attributes: {
                title: string
                seo?: TSeo
            }
        }
    }
}

export interface PriceSection {
    __typename: 'PriceSection'
    label: string
    price: ComponentPricePrice[]
}

export interface IHomePageBenefit {
    __typename: string
    attributes: {
        __typename: string
        title: string
        subtitle: string
        description: string
        slider: IHomePageBenefitSlide[]
    }
}

export interface HomePageBenefit {
    homePageBenefit: {
        __typename: string
        data: IHomePageBenefit | null
    }
}

export type TClinicReview = {
    reviewType: 'clinic'
    clinic: {
        __typename: 'ClinicEntityResponse'
        data: {
            __typename: 'ClinicEntity'
            attributes: {
                __typename: 'Clinic'
                label: string
            }
        }
    }
}
export type TDoctorReview = {
    reviewType: 'doctor'
    doctor: {
        __typename: 'DoctorEntityResponse'
        data: {
            __typename: 'DoctorEntity'
            attributes: {
                __typename: 'Doctor'
                name: string
            }
        }
    }
}
export type TReview = {
    __typename: 'ComponentFormReviewForm'
    name: string
    id: string
    reviewText: string
}

export interface IReview {
    __typename: 'ReviewEntity'
    id: string
    attributes: {
        __typename: 'Review'
        publishedAt: string
        review: (TReview & TClinicReview) | (TReview & TDoctorReview)
    }
}

export interface ReviewsList {
    reviews: {
        __typename: string
        data: IReview[]
    }
}

export type IParagraphItem = {
    type: 'paragraph'
    children: {
        type: 'text'
        text: string
        bold?: boolean
        italic?: boolean
        underline?: boolean
        code?: boolean
        strikethrough?: boolean
    }[]
}
export type IHeadingItem = {
    type: 'heading'
    level: number
    children: {
        type: 'text'
        text: string
    }[]
}
export type IListItem = {
    type: 'list'
    format: 'unordered' | 'ordered'
    children: {
        type: 'list-item'
        children: {
            type: 'text'
            text: string
        }[]
    }[]
}
export type ITextItems = IParagraphItem | IHeadingItem | IListItem
export type IComponentTextText = {
    __typename: 'ComponentTextText'
    id: string
    text: ITextItems[]
}
export type ComponentTextBenefit = {
    __typename: 'ComponentTextBenefit'
    id: string
    text: string
    title: string
}
export type ComponentSlidersSlider = {
    __typename: 'ComponentSlidersSlider'
    banner: {
        data: {
            id: string
            __typename: 'UploadFileEntity'
            attributes: {
                formats: TImageFormats
                caption?: string
                alternativeText?: string
            }
        }[]
    }
    label: string
    id: string
}
export type NewsBodyItem = IComponentTextText | ComponentSlidersSlider

export interface INewsItem {
    __typename: 'NewsPostEntity'
    id: string
    attributes: {
        __typename: 'NewsPost'
        slug: string | null
        description: string | null
        title?: string
        createdAt: string
        publishedAt: string
        avatar?: UploadFileEntityResponse
    }
}

export interface NewsList {
    newsPosts: {
        __typename: 'NewsPostEntityResponseCollection'
        data: INewsItem[]
    }
}

export interface Footer {
    footer: {
        __typename: 'FooterEntityResponse'
        data: {
            __typename: 'FooterEntity'
            attributes: {
                __typename: 'Footer'
                disclaimer: string
                warning: string
                copyright: string
            }
        }
    }
}

export interface Socials {
    socialNetworkSection: {
        __typename: 'SocialNetworkSectionEntityResponse'
        data: {
            __typename: 'SocialNetworkSectionEntity'
            attributes: {
                __typename: 'SocialNetworkSection'
                socialNetwork: {
                    __typename: 'ComponentSocialsSocialNetwork'
                    label: string
                    url: string
                    id: string
                    icon: {
                        __typename: 'UploadFileRelationResponseCollection'
                        data: {
                            __typename: 'UploadFileEntity'
                            attributes: {
                                __typename: 'UploadFile'
                                alternativeText?: string
                                caption?: string
                                url: string
                            }
                        }[]
                    }
                }[]
            }
        }
    }
}

export type ComponentButtonButton = {
    __typename: 'ComponentButtonButton'
    id: string
    label: string
    style: string
    url: string
}

export interface NewsQuery {
    newsListing: {
        __typename: 'NewsListingEntityResponse'
        data: {
            __typename: 'NewsListingEntity'
            attributes: {
                __typename: 'NewsListing'
                title: string
                seo?: TSeo
            }
        }
    }
}

export type TMeta = {
    __typename: 'ResponseCollectionMeta'
    pagination: {
        __typename: 'Pagination'
        pageCount: number
        total: number
        pageSize: number
        page: number
    }
}

export interface NewsPostsQuery {
    newsPosts: {
        __typename: 'NewsPostEntityResponseCollection'
        data: {
            __typename: 'NewsPostEntity'
            id: string
            attributes: Pick<
                INewsItem['attributes'],
                'avatar' | 'title' | 'slug' | 'publishedAt'
            >
        }[]
        meta: TMeta
    }
}

export interface AboutQuery {
    about: {
        __typename: 'AboutEntityResponse'
        data?: {
            __typename: 'AboutEntity'
            attributes: {
                __typename: 'About'
                title: string
                slider: ComponentSlidersSlider[]
                slogan?: string
                button?: ComponentButtonButton
                description?: string
                benefits: ComponentTextBenefit[]
                seo?: TSeo
                seoText: ITextItems[]
                image?: ComponentSlidersSlider
                videoUrl?: string
                videoPoster?: {
                    data: {
                        attributes: {
                            formats: TImageFormats
                        }
                    }
                }
                aboutUsText: ITextItems[]
            }
        }
    }
}

export type TImage = {
    name: string
    hash: string
    ext: string
    mime: string
    path: string | null
    width: number
    height: number
    size: number
    url: string
}
export type TImageFormats = {
    thumbnail: TImage // 245
    small: TImage // 500
    medium: TImage // 750
    large: TImage // 1000
    small_x2: TImage // 1000
    medium_x2: TImage // 1500
    large_x2: TImage // 2000
}

export type IBreadCrumb = {
    path: string
    title: string
}

export interface ISocialItem {
    __typename: 'ComponentSocialsSocialNetwork'
    url: string
    label?: string
    id: string
    icon: {
        data: {
            attributes: {
                url: string
            }
        }[]
    }
}

export interface IClinic {
    __typename: 'ClinicEntity'
    id: string
    attributes: {
        __typename: 'Clinic'
        address: string
        coordinates: string
        busStation?: string
        email: string
        label: string
        phone: ITextItems[]
        workingHours: ITextItems[]
        socials: ISocialItem[]
    }
}

export interface IPricesPage {
    prices: {
        __typename: 'PricesEntityResponse'
        data: {
            id: string
            __typename: 'PricesEntity'
            attributes: {
                __typename: 'Prices',
                title: string
                seo?: TSeo
                services: {
                    __typename: 'ServiceRelationResponseCollection'
                    data: {
                        __typename: 'ServiceEntity'
                        id: string
                        attributes: {
                            __typename: 'Service'
                            title: string
                            slug: string
                            sekcziya_stoimosts: {
                                data: PriceSectionEntity[]
                            }
                            sub_services: {
                                __typename: 'SubServiceRelationResponseCollection'
                                data: {
                                    __typename: 'SubServiceEntity'
                                    id: string
                                    attributes: {
                                        __typename: 'SubService'
                                        title: string
                                        slug: string
                                        price_sections: {
                                            __typename: 'PriceSectionRelationResponseCollection'
                                            data: PriceSectionEntity[]
                                        }
                                    }
                                }[]
                            }
                        }
                    }[]
                }
            }
        }
    }
}

export enum PublicationState {
    LIVE = 'LIVE',
    PREVIEW = 'PREVIEW'
}

export interface ContactPage {
    contactPage: {
        data: {
            attributes: {
                title: string
                yandexMapsToken?: string
                seo?: TSeo
                legalInfo: ITextItems[]
                clinics: {
                    data: IClinic[]
                }
            }
        }
    }
}

export interface ComponentMenuLink {
    __typename: 'ComponentMenuLink'
    id: string
    label: string
    url: string
    style: 'link'
}

export interface CustomerPage {
    textPages: {
        data: {
            attributes: {
                title: string
                textRich: string
                seo?: TSeo
            }
        }[]
    }
}

export interface CustomersPage {
    clientInformation: {
        data: {
            attributes: {
                title: string
                seo?: TSeo
                informationPagesListing: ComponentMenuLink[]
            }
        }
    }
}

export interface TTag {
    id: string
    attributes: {
        title: string
        slug: string
    }
}

export interface TAnswer {
    id: string
    attributes: {
        text: string
        title: string
        tag: {
            data?: {
                id: string
            }
        }
    }
}

export interface FAQPage {
    tags: {
        data: TTag[]
    }

    answersListing: {
        data: {
            attributes: {
                title: string
                seo?: TSeo
            }
        }
    }
}

export interface AnswersQuery {
    answers: {
        data: TAnswer[]
        meta: TMeta
    }
}

export interface ReviewPostsQuery {
    reviews: {
        __typename: 'ReviewEntityResponseCollection'
        meta: TMeta
        data: {
            __typename: 'ReviewEntity'
            id: string
            attributes: {
                __typename: 'Review'
                publishedAt: string
                review: {
                    __typename: 'ComponentFormReviewForm'
                    name: string
                    reviewText: string
                    doctor: {
                        __typename: 'DoctorEntityResponse'
                        data?: null
                    }
                    clinic?: {
                        __typename: 'ClinicEntityResponse'
                        data: {
                            __typename: 'ClinicEntityResponse'
                            data: {
                                __typename: 'ClinicEntity'
                                attributes: {
                                    __typename: 'Clinic'
                                    label: string
                                }
                            }
                        }
                    }
                }
            }
        }[]
    }
}

export interface CookiesAnnouncement {
    cookiesAnnouncement: {
        __typename: 'CookiesAnnouncementEntityResponse'
        data: {
            __typename: 'CookiesAnnouncementEntity'
            attributes: {
                __typename: 'CookiesAnnouncement'
                description: string
                label: string
            }
        }
    }
}

export interface SearchHits<T> {
    estimatedTotalHits: number
    limit: number
    offset: number
    query: string
    processingTimeMs: number
    hits: T[]
}