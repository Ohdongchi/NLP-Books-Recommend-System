export const REVIEW_REQUEST = "REVIEW_REQUEST" as const;
export const REVIEW_RESPONSE = "REVIEW_RESPONSE" as const;
export const REVIEW_ERROR = "REVIEW_ERROR" as const;

interface Review_type {
    review: Array<string>
    error: any
}

const initState: Review_type = {
    review: [],
    error: null
}


export const getReview = (isbn: string) => {
    console.log("reviewRequest", isbn);   
    return {
        type: REVIEW_REQUEST,
        payload: isbn
    }
}
export const reviewResponse = (value: any) => {
    return {
        type: REVIEW_RESPONSE,
        payload: value
    }
}

export const reviewError = (err: any) => {
    return {
        type: REVIEW_ERROR,
        error: err
    }
}

type reviewActionType = ReturnType<typeof getReview> | ReturnType<typeof reviewResponse> | ReturnType<typeof reviewError>;

const ReviewReducer = (state: Review_type = initState, action: reviewActionType) => {
    switch (action.type) {
        case REVIEW_REQUEST:
            return state;
        case REVIEW_RESPONSE:
            return {
                ...state,
                review: action.payload
            };
        case REVIEW_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;

    }
}

export default ReviewReducer;