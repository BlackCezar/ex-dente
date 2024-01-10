export interface DoctorReviews {
    reviews: {
        __typename: 'ReviewEntityResponseCollection'
        data: {
            __typename: 'ReviewEntity'
            id: string
            attributes: {
                __typename: 'Review'
                publishedAt: string
                review: {
                    __typename: 'ComponentFormReviewForm'
                    reviewText: string
                    name: string
                }
            }
        }[]
    }
}
