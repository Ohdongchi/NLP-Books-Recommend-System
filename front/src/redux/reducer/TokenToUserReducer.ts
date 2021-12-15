export const TOKEN_REQUEST = "TOKEN_REQUEST" as const;
export const TOKEN_RESPONSE = "TOKEN_RESPONSE" as const;
export const TOKEN_ERROR = "TOKEN_ERROR" as const;


type TokenToUser_type = {
    user: any,
    error: any
}

const initState: TokenToUser_type = {
    user: null,
    error: null,
}

export const TokToU_Request = (value: string) => {
    console.log("TokToU reducer");
    return {
        type: TOKEN_REQUEST,
        payload: value
    }
}

export const TokToU_Response = (value: string) => {
    return {
        type: TOKEN_RESPONSE,
        payload: value,
    }
}

export const TokToU_Error = (err: any) => {
    return {
        type: TOKEN_ERROR,
        error: err
    }
}

type TokToUAction = ReturnType<typeof TokToU_Request> | ReturnType<typeof TokToU_Response> | ReturnType<typeof TokToU_Error>;

const TokenToUserReducer = ( state:TokenToUser_type=initState, action: TokToUAction) => {
    switch(action.type) {
        case TOKEN_REQUEST:
            return state;
        case TOKEN_RESPONSE:
            return {
                ...state,
                user:action.payload,
            }
        case TOKEN_ERROR:
            return {
                ...state,
                error:action.error,
            }
        default:
            return state;
    }
}

export default TokenToUserReducer;