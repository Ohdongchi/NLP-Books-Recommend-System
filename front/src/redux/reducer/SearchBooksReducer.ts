export const SEARCH_REQUEST = "SEARCH_REQUEST" as const;
export const SEARCH_RESPONSE = "SEARCH_RESPONSE" as const;
export const SEARCH_ERROR = "SEARCH_ERROR" as const;

interface SearchBooks_type {
  search_books: Array<string>;
  err: string;
}

const initState: SearchBooks_type = {
  search_books: [],
  err: "",
};

export const SearchBooksRequest = (value:string) => {
  console.log(value);
  return {
    type: SEARCH_REQUEST,
    payload:value
  };
};

export const SearchBooksResponse = (value: any) => {
  return {
    type: SEARCH_RESPONSE,
    payload: value,
  };
};

export const SearchBooksError = (err: any) => {
  return {
    type: SEARCH_ERROR,
    error: err,
  };
};

type SearchBooksActionTypes =
  | ReturnType<typeof SearchBooksRequest>
  | ReturnType<typeof SearchBooksResponse>
  | ReturnType<typeof SearchBooksError>;

const SearchBooksReducer = (
  state: SearchBooks_type = initState,
  action: SearchBooksActionTypes
) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return state;
    case SEARCH_RESPONSE:
      return {
        ...state,
        search_books: action.payload,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        err: action.error,
      };
    default:
      return state;
  }
};

export default SearchBooksReducer;
