export const DOC_TO_VEC_REQUEST = "DOC_TO_VEC_REQUEST" as const;
export const DOC_TO_VEC_RESPONSE = "DOC_TO_VEC_RESPONSE" as const;
export const DOC_TO_VEC_ERROR = "DOC_TO_VEC_ERROR" as const;

interface DocToVec_type {
  DocToVec_data: Array<string>;
  err: string;
}

const initState: DocToVec_type = {
  DocToVec_data: [],
  err: "",
};

export const Doc_To_Vec_Request = (value:any) => {
  return {
    type: DOC_TO_VEC_REQUEST,
    payload:value
  };
};

export const Doc_To_Vec_Response = (value: any) => {
  return {
    type: DOC_TO_VEC_RESPONSE,
    payload: value,
  };
};

export const Doc_To_Vec_Error = (err: any) => {
  return {
    type: DOC_TO_VEC_ERROR,
    error: err,
  };
};

type DocToVec_ActionTypes =
  | ReturnType<typeof Doc_To_Vec_Request>
  | ReturnType<typeof Doc_To_Vec_Response>
  | ReturnType<typeof Doc_To_Vec_Error>;

const DocToVec_Reducer = (
  state: DocToVec_type = initState,
  action: DocToVec_ActionTypes
) => {
  switch (action.type) {
    case DOC_TO_VEC_REQUEST:
      return {
        ...state,
      };
    case DOC_TO_VEC_RESPONSE:
      return {
        ...state,
        DocToVec_data: action.payload,
      };
    case DOC_TO_VEC_ERROR:
      return {
        ...state,
        err: action.error,
      };
    default:
      return state;
  }
};


export default DocToVec_Reducer;