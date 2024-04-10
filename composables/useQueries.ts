export default function useQueries() {
    var cookiesQuery = gql`
        query CookiesQuery {
            cookiesAnnouncement {
                data {
                    attributes {
                        description
                        label
                        style
                    }
                }
            }
        }
    `

    var articlePageQuery = gql`
    query Articles($filters: ArticleFiltersInput) {
        articles(filters: $filters) {
          data {
            attributes {
              banner {
                data {
                  attributes {
                    alternativeText
                    url
                    caption
                  }
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
              content
              title
              slug
              publishedAt
              description
            }
          }
        }
      }
    `

    var articleQuery = gql`
        query ArticlePage {
            articlePage {
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
                                        url
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
                                            url
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

    var clinicsQuery = gql`
        query {
            clinics {
            data {
                id
                attributes {
                address
                label
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
                        name
                        company
                        description
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
                                    id
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
                                id
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
                        h1
                        seoText
                    }
                }
            }
        }
    `

    var subServicePageQuery = gql`
        query SubServices($filters: SubServiceFiltersInput) {
            subServices(filters: $filters) {
                data {
                    attributes {
                        title
                        slug
                        subtitle
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
                        doctors {
                            data {
                                id
                                attributes {
                                    image {
                                        data {
                                            attributes {
                                                alternativeText
                                                caption
                                                formats
                                                url
                                            }
                                        }
                                    }
                                    name
                                    slug
                                    specification
                                }
                            }
                        }
                        description
                        image {
                            data {
                                attributes {
                                    alternativeText
                                    caption
                                    url
                                }
                                id
                            }
                        }
                        service {
                            data {
                                attributes {
                                    title
                                    slug
                                }
                            }
                        }
                        price_sections {
                            data {
                                attributes {
                                    label
                                    price {
                                        price
                                        id
                                        description
                                        style
                                    }
                                }
                                id
                            }
                        }
                        galary {
                            label
                            id
                            banner {
                                data {
                                    attributes {
                                        alternativeText
                                        caption
                                        formats
                                    }
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    var mainPageNewsQuery = gql`
        query NewsQuery($pagination: PaginationArg, $sort: [String]) {
            newsPosts(pagination: $pagination, sort: $sort) {
                data {
                    id
                    attributes {
                        title
                        slug
                        description
                        publishedAt
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

    var reviewsPosts = gql`
        query reviewsPosts(
            $pagination: PaginationArg
            $filters: ReviewFiltersInput
            $sort: [String]
        ) {
            reviews(pagination: $pagination, filters: $filters, sort: $sort) {
                meta {
                    pagination {
                        pageCount
                    }
                }
                data {
                    id
                    attributes {
                        publishedAt
                        review {
                            name
                            reviewText
                            reviewType
                            doctor {
                                data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                            clinic {
                                data {
                                    attributes {
                                        label
                                    }
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

    var doctorsListQuery = gql`
        query Doctors {
            doctors {
                data {
                    id
                    attributes {
                        name
                        slug
                        specification
                        image {
                            data {
                                attributes {
                                    alternativeText
                                    caption
                                    formats
                                }
                            }
                        }
                        sub_services {
                            data {
                                id
                            }
                        }
                    }
                }
            }
        }
    `
    var doctorsPosts = gql`
        query Doctors(
            $pagination: PaginationArg
            $filters: DoctorFiltersInput
        ) {
            doctors(pagination: $pagination, filters: $filters) {
                meta {
                    pagination {
                        page
                        pageCount
                        pageSize
                        total
                    }
                }
                data {
                    id
                    attributes {
                        name
                        clinicAddress
                        slug
                        specification
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

    var subServicesQuery = gql`
        query SubServices($filters: SubServiceFiltersInput) {
            subServices(filters: $filters) {
                data {
                    id
                    attributes {
                        title
                        slug
                    }
                }
            }
        }
    `

    var mainServicePageQuery = gql`
        query ServicePage {
            serviceListing {
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

    var servicePageQuery = gql`
        query ServicesPAge($filters: ServiceFiltersInput) {
            services(filters: $filters) {
                data {
                    id
                    attributes {
                        slug
                        sekcziya_stoimosts {
                            data {
                              id
                              attributes {
                                label
                                price {
                                  description
                                  price
                                  id
                                  style
                                }
                              }
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
                        sub_services {
                            data {
                                id
                                attributes {
                                    slug
                                    title
                                }
                            }
                        }
                        subtitle
                        title
                        description
                        doctors {
                            data {
                                id
                                attributes {
                                    specification
                                    slug
                                    name
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
                        }
                    }
                }
            }
        }
    `

    var doctorsPageQuery = gql`
        query DoctorsListing {
            doctorsListing {
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

    var doctorPageQuery = gql`
        query Doctors($filters: DoctorFiltersInput) {
            doctors(filters: $filters) {
                data {
                    id
                    attributes {
                        name
                        slug
                        specification
                        experience
                        image {
                            data {
                                attributes {
                                    alternativeText
                                    caption
                                    formats
                                }
                            }
                        }
                        certs {
                            data {
                                attributes {
                                    alternativeText
                                    caption
                                    formats
                                }
                                id
                            }
                        }
                        clinicAddress
                        education
                        information
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
                        sub_services {
                            data {
                                id
                                attributes {
                                    slug
                                    title
                                    service {
                                        data {
                                            attributes {
                                                slug
                                            }
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

    var reviewsPageQuery = gql`
        query ReviewsPage {
            straniczaOtzyvov {
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

    var reviewsDoctorQuery = gql`
        query Reviews(
            $filters: ReviewFiltersInput
            $pagination: PaginationArg
        ) {
            reviews(filters: $filters, pagination: $pagination) {
                data {
                    id
                    attributes {
                        review {
                            name
                            reviewText
                        }
                        publishedAt
                    }
                }
            }
        }
    `

    var pricesPageQuery = gql`
        query Attributes($publicationState: PublicationState, $servicesPublicationState2: PublicationState, $filters: ServiceFiltersInput) {
            prices(publicationState: $publicationState) {
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
                services(publicationState: $servicesPublicationState2, filters: $filters) {
                    data {
                    id
                    attributes {
                        title
                        slug
                        sekcziya_stoimosts {
                            data {
                            id
                            attributes {
                                label
                                price {
                                description
                                price
                                id
                                style
                                }
                            }
                            }
                        }
                    }
                    }
                }
                }
                id
            }
            }
        }
    `

    var contactsPageQuery = gql`
        query ContactPage {
            contactPage {
                data {
                    attributes {
                        title
                        legalInfo
                        yandexMapsToken
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
                        clinics {
                            data {
                                id
                                attributes {
                                    address
                                    coordinates
                                    email
                                    busStation
                                    label
                                    phone
                                    socials {
                                        url
                                        label
                                        id
                                        icon {
                                            data {
                                                attributes {
                                                    url
                                                }
                                            }
                                        }
                                    }
                                    workingHours
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    var customersPageQuery = gql`
        query CustomersPage {
            clientInformation {
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
                        informationPagesListing {
                            ... on ComponentMenuLink {
                                id
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

    var customerPageQuery = gql`
        query CustomerPage($filters: TextPageFiltersInput) {
            textPages(filters: $filters) {
                data {
                    attributes {
                        title
                        textRich
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

    var faqPageQuery = gql`
        query Attributes {
            tags {
                data {
                    id
                    attributes {
                        title
                        slug
                    }
                }
            }
            answersListing {
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
    var answersQuery = gql`
        query Attributes(
            $pagination: PaginationArg
            $filters: AnswerFiltersInput
        ) {
            answers(pagination: $pagination, filters: $filters) {
                data {
                    id
                    attributes {
                        text
                        title
                        tag {
                            data {
                                id
                            }
                        }
                    }
                }
                meta {
                    pagination {
                        pageCount
                    }
                }
            }
        }
    `

    var createRequest = gql`
    mutation Mutation($data: RequestInput!) {
        createRequest(data: $data) {
          data {
            id
          }
        }
      }
    `

    var createReviewMutation = gql`
    mutation CreateReview($data: ReviewInput!) {
        createReview(data: $data) {
          data {
            id
          }
        }
    }
    `

    var articlePosts = gql`
    query Articles($sort: [String], $pagination: PaginationArg) {
        articles(sort: $sort, pagination: $pagination) {
          meta {
            pagination {
              total
              pageSize
              pageCount
            }
          }
          data {
            id
            attributes {
              banner {
                data {
                  id
                  attributes {
                    alternativeText
                    caption
                    url
                  }
                }
              }
              description
              title
              slug
              publishedAt
            }
          }
        }
      }

    `

    return {
        // News
        newsPosts,
        newsQuery,
        newsPageQuery,
        // Services
        servicePageQuery,
        subServicePageQuery,
        servicesQuery,
        subServicesQuery,
        mainServicePageQuery,
        // Sales
        salesPage,
        salesPageQuery,
        salesPosts,
        // Main page
        mainMenuQuery,
        homePage,
        homePageBenefitQuery,
        mainPageReviewsListQuery,
        mainPageNewsQuery,
        // About page
        aboutPageQuery,
        // Common
        socialsQuery,
        commonConfigQuery,
        headerQuery,
        footerQuery,
        cookiesQuery,
        // Doctors
        doctorsPageQuery,
        doctorsPosts,
        doctorPageQuery,
        doctorsListQuery,
        // Reviews
        reviewsDoctorQuery,
        reviewsPageQuery,
        reviewsPosts,
        // Contacts
        contactsPageQuery,
        clinicsQuery,
        // Customers page
        customersPageQuery,
        customerPageQuery,
        // FAQ
        faqPageQuery,
        answersQuery,

        // requests
        createRequest,
        createReviewMutation,

        // Prices Page
        pricesPageQuery,

        // Articles
        articleQuery,
        articlePosts,
        articlePageQuery
    }
}
