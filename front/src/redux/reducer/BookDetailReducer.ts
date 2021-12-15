export const BOOK_DETAIL_REQUEST = "BOOK_DETAIL_REQUEST" as const;
export const BOOK_DETAIL_RESPONSE = "BOOK_DETAIL_RESPONSE" as const;
export const BOOK_DETAIL_ERROR = "BOOK_DETAIL_ERROR" as const;

interface Book_detail_type {
    res: Array<string>,
    error: string
}

const initState: Book_detail_type = {
    res: [],
    error: ""
}

export const DetailRequest = (value: any) => {
    
    return {
        type: BOOK_DETAIL_REQUEST,
        payload: value
    }
}

export const DetailResponse = (resData: any) => {
    return {
        type: BOOK_DETAIL_RESPONSE,
        payload: resData
    }
}

export const DetailError = (err: any) => {
    return {
        type: BOOK_DETAIL_ERROR,
        payload: err
    }
}

type BookDetailActionTypes = ReturnType<typeof DetailRequest> | ReturnType<typeof DetailResponse> | ReturnType<typeof DetailError>;

function BookDetailReducer(state: Book_detail_type = initState, action: BookDetailActionTypes) {
    
    switch (action.type) {
        case BOOK_DETAIL_REQUEST:
            return state;
        case BOOK_DETAIL_RESPONSE:
            return {
                ...state,
                res: action.payload
            }
        case BOOK_DETAIL_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default BookDetailReducer;