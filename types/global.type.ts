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

export interface TSeo {
    __typename: string
    keywords: string
    metaDescription: string
    metaTitle: string
    preventIndexing: boolean
    sharedImage: {
        __typename: string
        alt: string
        media: {
            __typename: string
            data: {
                __typename: string
                attributes: {
                    __typename: string
                    url: string
                    caption: string | null
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
                url: string
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
                url: string | null
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
    }
}
export type ITextItems = IParagraphItem
export type IComponentTextText = {
    __typename: 'ComponentTextText'
    id: string
    text: ITextItems[]
}
export type ComponentSlidersSlider = {
    __typename: 'ComponentSlidersSlider'
    banner: {
        __typename: 'UploadFileEntityResponse'
        data: {
            __typename: 'UploadFileEntity'
            attributes: {
                __typename: 'UploadFile'
                url: string
                alternativeText?: string
            }
        }
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
        avatar: {
            data?: {
                attributes: {
                    alternativeText?: string
                    url?: string
                }
            }
        }
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
