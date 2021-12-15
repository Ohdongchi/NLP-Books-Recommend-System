export const TFIDF_REQUEST = "TFIDF_REQUEST" as const;
export const TFIDF_RESPONSE = "TFIDF_RESPONSE" as const;
export const TFIDF_ERROR = "TFIDF_ERROR" as const;

interface TFIDF_type {
  TFIDF_data: Array<string>;
  err: string;
}

const initState: TFIDF_type = {
  TFIDF_data: [],
  err: "",
};

export const TFIDF_Request = (value:any) => {
  return {
    type: TFIDF_REQUEST,
    payload:value
  };
};

export const TFIDF_Response = (value: any) => {
  return {
    type: TFIDF_RESPONSE,
    payload: value,
  };
};

export const TFIDF_Error = (err: any) => {
  return {
    type: TFIDF_ERROR,
    error: err,
  };
};

type TFIDF_ActionTypes =
  | ReturnType<typeof TFIDF_Request>
  | ReturnType<typeof TFIDF_Response>
  | ReturnType<typeof TFIDF_Error>;

const TFIDF_Reducer = (
  state: TFIDF_type = initState,
  action: TFIDF_ActionTypes
) => {
  switch (action.type) {
    case TFIDF_REQUEST:
      return {
        ...state,
      };
    case TFIDF_RESPONSE:
      return {
        ...state,
        TFIDF_data:action.payload
      };
    case TFIDF_ERROR:
      return {
        ...state,
        err:action.error
      };
    default:
      return state;
  }
};

export default TFIDF_Reducer;