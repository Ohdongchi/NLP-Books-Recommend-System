import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

import { USER_CF_REQUEST, USER_CF_RESPONSE, USER_CF_ERROR } from "../../reducer/ai/User_Collaboration_Filtering_Reducer";

const UserCF_API = async (userid: number) => {
    const res = await axios.get(`http://localhost:3001/book/usercf/${userid}`);
    return res;
};

function* User_CF_Request({ payload }: any) {
    try {
        const { data } = yield call(UserCF_API, payload);
        // console.log(data);
        yield put({
            type: USER_CF_RESPONSE,
            payload: data
        });
    }
    catch {
        yield put({
            type: USER_CF_ERROR,
            error: "USER_CF_SAGA_ERROR"
        });
        // console.log("saga error");
    }
}


function* catch_User_CF_Request() {
    yield takeEvery(USER_CF_REQUEST, User_CF_Request);
}

export default function* User_CF_Saga() {
    yield all([
        fork(catch_User_CF_Request),
    ]);
}