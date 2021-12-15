export const USER_CF_REQUEST = "USER_CF_REQUEST" as const;
export const USER_CF_RESPONSE = "USER_CF_RESPONSE" as const;
export const USER_CF_ERROR = "USER_CF_ERROR" as const;

interface UserCF_type {
  UserCF_data: Array<string>;
  err: string;
}

const initState: UserCF_type = {
  UserCF_data: [],
  err: "",
};

export const UserCF_Request = (value:any) => {
  // console.log("usercf reducer");
  return {
    type: USER_CF_REQUEST,
    payload:value
  };
};

export const UserCF_Response = (value: any) => {
  return {
    type: USER_CF_RESPONSE,
    payload: value,
  };
};

export const UserCF_Error = (err: any) => {
  return {
    type: USER_CF_ERROR,
    error: err,
  };
};

type User_CF_ActionTypes =
  | ReturnType<typeof UserCF_Request>
  | ReturnType<typeof UserCF_Response>
  | ReturnType<typeof UserCF_Error>;

const User_CF_Reducer = (
  state: UserCF_type = initState,
  action: User_CF_ActionTypes
) => {
  switch (action.type) {
    case USER_CF_REQUEST:
      return {
        ...state,
      };
    case USER_CF_RESPONSE:
      return {
        ...state,
        UserCF_data:action.payload
      };
    case USER_CF_ERROR:
      return {
        ...state,
        err:action.error
      };
    default:
      return state;
  }
};

export default User_CF_Reducer