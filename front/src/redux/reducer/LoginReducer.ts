
export const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
export const LOGIN_RESPONSE = "LOGIN_RESPONSE" as const;
export const LOGIN_ERROR = "LOGIN_ERROR" as const;
export const LOGOUT = "LOGOUT" as const
type Login_type = {
    email: string,
    password: string,
    error: string,
    res: string,
}

const initState: Login_type = {
    email: "",
    password: "",
    error: "",
    res: "",
}


export const LoginRequest = (value: Array<string>) => {
    // console.log(value);
    return {
        type: LOGIN_REQUEST,
        payload: value,
    }
}

const LoginResponse = (value: Array<string>) => {
    return {
        type: LOGIN_RESPONSE,
        payload: value
    }
}

const LoginError = (err: any) => {
    return {
        type: LOGIN_ERROR,
        error: err,
    }
}

export const LoginInit = () => {
    return {
        type: LOGOUT,
    }
}

type LgoinAction = ReturnType<typeof LoginRequest> | ReturnType<typeof LoginResponse> | ReturnType<typeof LoginError> | ReturnType<typeof LoginInit>;

const LoginReducer = (state: Login_type = initState, action: LgoinAction) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state;
        case LOGIN_RESPONSE:
            // console.log(action.payload.toString());
            return {
                ...state,
                res: action.payload.toString(),
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.error
            };
        case LOGOUT:
            return {
                ...state,
                res:"",
                error:""
            }
        default:
            return state;
    }
}

export default LoginReducer;