import axios from "axios";


const REGISTER_MODAL_CONDITION = "REGISTER_MODAL_CONDITION" as const;
const LOGIN_MODAL_CONDITION = "LOGIN_MODAL_CONDITION" as const;
// type
interface register_condition_modal_state_type {
  Reg_modal: boolean;
  Login_modal: boolean;
}

// state
const reg_con_modal_initState: register_condition_modal_state_type = {
  Reg_modal: false,
  Login_modal: false,
};

// action
export const Reg_modal_Request = () => {
  return {
    type: REGISTER_MODAL_CONDITION,
  };
};

export const Login_Modal_Request = () => {
  return {
    type: LOGIN_MODAL_CONDITION,
  };
}

type reg_con_Action =
  | ReturnType<typeof Reg_modal_Request>
  | ReturnType<typeof Login_Modal_Request>;

const modal_Reducer = (state: register_condition_modal_state_type = reg_con_modal_initState, action: reg_con_Action) => {
  switch (action.type) {
    case REGISTER_MODAL_CONDITION:
      
      if (state.Reg_modal) {
        return {
          ...state,
          Reg_modal: false,
        };
      } else {
        return {
          ...state,
          Reg_modal: true,
        };
      }
    case LOGIN_MODAL_CONDITION:
      // console.log("login modal");
      if (state.Login_modal) {
        return {
          ...state,
          Login_modal: false,
        };
      } else {
        return {
          ...state,
          Login_modal: true,
        };
      }
    default:
      return state;
  }
};

export default modal_Reducer;
