import type { ApplicationEvents } from '~/plugins/event-bus'

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
    }> {}

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
    sharedImage: {
        __typename: 'ComponentSharedSharedImage'
        alt: string
        media: UploadFileEntityResponse
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

export interface HomePage {
    homePage: {
        __typename: string
        data: {
            __typename: string
            attributes: {
                title: string
                seoText?: string
                seo: TSeo
                slider: TSlide[]
            }
        }
    }
}

export interface IService {
    __typename: string
    id: string
    title: string
    slug: string
    sub_services: {
        __typename: string
        data: TData<IService>[]
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
            attributes: {
                formats: TImageFormats | null
                alternativeText: string | null
                caption: string | null
            }
        }
    } | null
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
    banner: UploadFileEntityResponse
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
        meta: {
            __typename: 'ResponseCollectionMeta'
            pagination: {
                __typename: 'Pagination'
                pageCount: number
                total: number
                pageSize: number
                page: number
            }
        }
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
