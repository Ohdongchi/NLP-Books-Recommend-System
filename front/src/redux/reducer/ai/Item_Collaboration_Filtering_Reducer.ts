export const ITEM_CF_REQUEST = "ITEM_CF_REQUEST" as const;
export const ITEM_CF_RESPONSE = "ITEM_CF_RESPONSE" as const;
export const ITEM_CF_ERROR = "ITEM_CF_ERROR" as const;
export const ITEM_CF_INIT = "ITEM_CF_INIT" as const;
interface ItemCF_type {
  ItemCF_data: Array<string>;
  err: string;
}

const initState: ItemCF_type = {
  ItemCF_data: [],
  err: "",
};

// value = userid
export const ItemCF_Request = (value:any) => {
  // console.log("itemcf reducer");
  return {
    type: ITEM_CF_REQUEST,
    payload:value
  };
};

export const ItemCF_Response = (value: any) => {
  return {
    type: ITEM_CF_RESPONSE,
    payload: value,
  };
};

export const ItemCF_Error = (err: any) => {
  return {
    type: ITEM_CF_ERROR,
    error: err,
  };
};

export const ItemCF_Init = () => {
  return {
    type:ITEM_CF_INIT,
  }
}

type Item_CF_ActionTypes =
  | ReturnType<typeof ItemCF_Request>
  | ReturnType<typeof ItemCF_Response>
  | ReturnType<typeof ItemCF_Error>
  | ReturnType<typeof ItemCF_Init>;

const Item_CF_Reducer = (
  state: ItemCF_type = initState,
  action: Item_CF_ActionTypes
) => {
  switch (action.type) {
    case ITEM_CF_REQUEST:
      return {
        ...state,
      };
    case ITEM_CF_RESPONSE:
      return {
        ...state,
        ItemCF_data:action.payload
      };
    case ITEM_CF_ERROR:
      return {
        ...state,
        err:action.error
      };
    case ITEM_CF_INIT:
      return {
        ...state,
        ItemCF_data:[],
        err:"",
      }
    default: 
      return state;
  }
};

export default Item_CF_Reducer;