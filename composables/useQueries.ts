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

    return {
        mainMenuQuery,
        commonConfigQuery,
        headerQuery,
        homePage,
        servicesQuery
    }
}
