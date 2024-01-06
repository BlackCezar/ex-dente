export default function useQueries() {
    var aboutPageQuery = gql`
        query Query {
            about {
                data {
                    attributes {
                        title
                        slider {
                            id
                            label
                            banner {
                                data {
                                    attributes {
                                        formats
                                    }
                                }
                            }
                        }
                        slogan
                        button {
                            id
                            label
                            style
                            url
                        }
                        description
                        benefits {
                            ... on ComponentTextBenefit {
                                id
                                text
                                title
                            }
                        }
                        seo {
                            id
                            metaTitle
                            metaDescription
                            sharedImage {
                                id
                                media {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                alt
                            }
                            preventIndexing
                            keywords
                        }
                        seoText
                        aboutUsText
                        image {
                            banner {
                                data {
                                    attributes {
                                        formats
                                    }
                                }
                            }
                        }
                        videoUrl
                        videoPoster {
                            data {
                                attributes {
                                    formats
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    var mainMenuQuery = gql`
        query mainMenuQuery {
            menuTest {
                data {
                    attributes {
                        body {
                            __typename
                            ... on ComponentMenuDropdown {
                                sections {
                                    data {
                                        attributes {
                                            label
                                            links {
                                                label
                                                url
                                                style
                                            }
                                        }
                                    }
                                }
                            }
                            ... on ComponentMenuLink {
                                label
                                url
                                style
                            }
                        }
                    }
                }
            }
        }
    `

    var commonConfigQuery = gql`
        query CommonConfig {
            commonConfig {
                data {
                    attributes {
                        address
                        cookiesAnnouncement
                        cookiesLifetimeDays
                        defaultSharedImage {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                        email
                        googleReCaptchaToken
                        logo {
                            logoDark {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                            logoLight {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                        phoneNumber
                    }
                }
            }
        }
    `

    var headerQuery = gql`
        query {
            header {
                data {
                    attributes {
                        title
                        request_button {
                            label
                            url
                            style
                        }
                    }
                }
            }
        }
    `

    var homePageBenefitQuery = gql`
        query HomePageBenefit {
            homePageBenefit {
                data {
                    attributes {
                        title
                        subtitle
                        description
                        benefit
                        slider {
                            id
                            label
                            style
                            banner {
                                data {
                                    attributes {
                                        formats
                                        alternativeText
                                        caption
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `
    var servicesQuery = gql`
        query allServicesWithSubServices {
            services {
                data {
                    id
                    attributes {
                        title
                        slug
                        sub_services {
                            data {
                                attributes {
                                    title
                                    slug
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    var homePage = gql`
        query HomePageQuery {
            homePage {
                data {
                    attributes {
                        slider {
                            ... on ComponentSlidersMainPageSlider {
                                bgColor
                                button {
                                    label
                                    style
                                    url
                                }
                                videoUrl
                                title
                                subtitle
                                isLight
                                image {
                                    data {
                                        attributes {
                                            formats
                                            caption
                                        }
                                    }
                                }
                            }
                        }
                        seo {
                            keywords
                            metaDescription
                            metaTitle
                            preventIndexing
                            sharedImage {
                                alt
                                media {
                                    data {
                                        attributes {
                                            url
                                            caption
                                        }
                                    }
                                }
                            }
                        }
                        title
                        seoText
                    }
                }
            }
        }
    `

    var mainPageNewsQuery = gql`
        query NewsQuery($pagination: PaginationArg) {
            newsPosts(pagination: $pagination) {
                data {
                    id
                    attributes {
                        title
                        slug
                        description
                        createdAt
                        avatar {
                            data {
                                attributes {
                                    alternativeText
                                    formats
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    var mainPageReviewsListQuery = gql`
        query ReviewsQuery($pagination: PaginationArg) {
            reviews(pagination: $pagination) {
                data {
                    id
                    attributes {
                        publishedAt
                        review {
                            name
                            id
                            reviewText
                            reviewType
                            clinic {
                                data {
                                    attributes {
                                        label
                                    }
                                }
                            }
                            doctor {
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    var footerQuery = gql`
        query Footer {
            footer {
                data {
                    attributes {
                        copyright
                        disclaimer
                        warning
                    }
                }
            }
        }
    `

    var socialsQuery = gql`
        query Socials {
            socialNetworkSection {
                data {
                    attributes {
                        socialNetwork {
                            ... on ComponentSocialsSocialNetwork {
                                url
                                label
                                id
                                icon {
                                    data {
                                        attributes {
                                            url
                                            alternativeText
                                            caption
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    var newsQuery = gql`
        query News {
            newsListing {
                data {
                    attributes {
                        title
                        seo {
                            id
                            metaTitle
                            metaDescription
                            sharedImage {
                                id
                                media {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                alt
                            }
                            preventIndexing
                            keywords
                        }
                    }
                }
            }
        }
    `
    var newsPosts = gql`
        query Query($pagination: PaginationArg) {
            newsPosts(pagination: $pagination) {
                data {
                    id
                    attributes {
                        publishedAt
                        avatar {
                            data {
                                attributes {
                                    formats
                                }
                            }
                        }
                        slug
                        title
                    }
                }
                meta {
                    pagination {
                        pageCount
                        total
                        pageSize
                        page
                    }
                }
            }
        }
    `

    var salesPosts = gql`
        query SalesPosts($pagination: PaginationArg) {
            promos(pagination: $pagination) {
                data {
                    id
                    attributes {
                        slug
                        subtitle
                        title
                        image {
                            data {
                                attributes {
                                    alternativeText
                                    caption
                                    formats
                                }
                            }
                        }
                    }
                }
                meta {
                    pagination {
                        page
                        pageCount
                        total
                        pageSize
                    }
                }
            }
        }
    `

    var salesPageQuery = gql`
        query SalesPost($filters: PromoFiltersInput) {
            promos(filters: $filters) {
                data {
                    id
                    attributes {
                        slug
                        subtitle
                        title
                        seo {
                            id
                            metaTitle
                            metaDescription
                            sharedImage {
                                id
                                media {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                alt
                            }
                            preventIndexing
                            keywords
                        }
                        image {
                            data {
                                attributes {
                                    alternativeText
                                    caption
                                    formats
                                }
                            }
                        }
                        publishedAt
                        description
                    }
                }
            }
        }
    `

    var newsPageQuery = gql`
        query Query($filters: NewsPostFiltersInput) {
            newsPosts(filters: $filters) {
                data {
                    id
                    attributes {
                        publishedAt
                        avatar {
                            data {
                                attributes {
                                    formats
                                    alternativeText
                                    caption
                                }
                            }
                        }
                        title
                        slug
                        seo {
                            id
                            metaTitle
                            metaDescription
                            sharedImage {
                                id
                                media {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                alt
                            }
                            preventIndexing
                            keywords
                        }
                        description
                        body {
                            ... on ComponentTextText {
                                id
                                text
                            }
                            ... on ComponentSlidersSlider {
                                id
                                label
                                banner {
                                    data {
                                        attributes {
                                            formats
                                            alternativeText
                                            caption
                                        }
                                    }
                                }
                                style
                            }
                            ... on Error {
                                code
                                message
                            }
                        }
                    }
                }
            }
        }
    `

    var salesPage = gql`
        query SalesPage {
            promoListing {
                data {
                    attributes {
                        title
                        seo {
                            id
                            metaTitle
                            metaDescription
                            sharedImage {
                                id
                                media {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                alt
                            }
                            preventIndexing
                            keywords
                        }
                    }
                }
            }
        }
    `

    return {
        newsPosts,
        newsQuery,
        socialsQuery,
        footerQuery,
        newsPageQuery,
        mainMenuQuery,
        salesPage,
        salesPageQuery,
        commonConfigQuery,
        salesPosts,
        headerQuery,
        aboutPageQuery,
        homePage,
        servicesQuery,
        homePageBenefitQuery,
        mainPageReviewsListQuery,
        mainPageNewsQuery,
    }
}
