export default function useQueries() {
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
                                    formats
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
                                            url
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

    return {
        mainMenuQuery,
        commonConfigQuery,
        headerQuery,
        homePage,
        servicesQuery,
        homePageBenefitQuery,
        mainPageReviewsListQuery
    }
}
