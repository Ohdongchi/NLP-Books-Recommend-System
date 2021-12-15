import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

// type
import {
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  LOGIN_ERROR,
} from "../reducer/LoginReducer";

const LoginAPI = async (value: any) => {
  // console.log("login saga", value);
  return await axios.post(`http://localhost:3001/auth/login`, {
    email: value[0],
    password: value[1],
  });
};
function* LoginRequest({ payload }: any) {
  try {
    const { data } = yield call(LoginAPI, payload);
    yield put({
      type: LOGIN_RESPONSE,
      payload: data.access_token,
    });
  } catch {
    yield put({
      type: LOGIN_ERROR,
      error: "Login Request Saga error",
    });
    // console.log("Login Request Saga error");
  }
}

function* catchLoginRequest() {
  yield takeEvery(LOGIN_REQUEST, LoginRequest);
}

export default function* LoginRequestSaga() {
  yield all([fork(catchLoginRequest)]);
}
