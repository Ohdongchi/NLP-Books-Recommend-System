export const EMAIL_VALIDATION_REQUEST = "EMAIL_VALIDATION_REQUEST" as const;
export const EMAIL_VALIDATION_RESPONSE = "EMAIL_VALIDATION_RESPONSE" as const;
export const EMAIL_VALIDATION_ERROR = "EMAIL_VALIDATION_ERROR" as const;

interface EMAIL_VALIDATION_TYPE {
    email: string,
    res:string,
    error:string,
}

const initState: EMAIL_VALIDATION_TYPE = {
    email: "",
    res:"",
    error:"",
}

export const emailvalidationRequestFunc = (value: any) => {
    // console.log("reducer", value);
    return {
        type: EMAIL_VALIDATION_REQUEST,
        payload: value
    };
}

export const emailvalidationResponseFunc = (response: any) => {
    return {
        type: EMAIL_VALIDATION_RESPONSE,
        payload: response
    }
}

export const emailvalidationErrorFunc = (error:any) => {
    return {
        type:EMAIL_VALIDATION_ERROR,
        payload:error
    }
}

type emailValidationTypes =
    | ReturnType<typeof emailvalidationRequestFunc>
    | ReturnType<typeof emailvalidationResponseFunc>
    | ReturnType<typeof emailvalidationErrorFunc>;

const validationReducer = (state: EMAIL_VALIDATION_TYPE = initState, action: emailValidationTypes) => {
    switch (action.type) {
        case EMAIL_VALIDATION_REQUEST:
            return {
                ...state
            };
        case EMAIL_VALIDATION_RESPONSE:
            return {
                ...state,
                res: action.payload
            }
        case EMAIL_VALIDATION_ERROR:
            return {
                ...state,
                error:action.payload
            }
        default:
            return state;
    }
}

export default validationReducer;