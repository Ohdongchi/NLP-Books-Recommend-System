import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import { TOKEN_REQUEST, TOKEN_RESPONSE, TOKEN_ERROR } from "../reducer/TokenToUserReducer";

const TTU_API = (token:any) => {
    return axios.get(`http://localhost:3001/auth/profile?token=${token}`);
};

function* TTU_Request({ payload }: any) {
    try {
        const {data} = yield call(TTU_API, payload);
        // console.log(data);
        yield put({
            type:TOKEN_RESPONSE,
            payload:data
        });
    }
    catch {
        yield put({
            type:TOKEN_ERROR,
            error:"Token To User Saga Error"
        });
        console.log("saga error");
    }
}


function* catchTokenToUserRequest() {
    yield takeEvery(TOKEN_REQUEST, TTU_Request);
}

export default function* TokenToUserSaga() {
    yield all([
        fork(catchTokenToUserRequest),
    ]);
}