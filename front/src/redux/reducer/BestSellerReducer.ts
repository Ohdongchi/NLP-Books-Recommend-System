import axios from "axios";

export const BEST_REQUEST = "BEST_REQUEST" as const;
export const BEST_RESPONSE = "BEST_RESPONSE" as const;

interface BestSeller_type {
    data: Array<string>,
    err:string,
}

const initState: BestSeller_type = {
    data: [],
    err:""
}

export const BestRequest = () => {
    return { type: BEST_REQUEST };
}

export const BestResponse = (value: any) => {
    return {
        type: BEST_RESPONSE,
        payload: value
    }
}

type BestActionTypes =
    | ReturnType<typeof BestRequest>
    | ReturnType<typeof BestResponse>;

const BestReducer = (state: BestSeller_type = initState, action: BestActionTypes) => {
    switch (action.type) {
        case BEST_REQUEST:
            return {
                ...state
            };
        case BEST_RESPONSE:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}
export default BestReducer;