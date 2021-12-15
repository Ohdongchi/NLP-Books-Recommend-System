import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

import { REVIEW_REQUEST, REVIEW_RESPONSE, REVIEW_ERROR } from "../reducer/Get_ReviewReducer";

const reviewAPI = async (isbn: any) => {
    return await axios.post(`http://localhost:3001/review/findReview/${isbn}`);
}

function* reviewRequest({ payload }: any) {
    try {
        const { data } = yield call(reviewAPI, payload);
        yield put({
            type: REVIEW_RESPONSE,
            payload: data
        });
    }
    catch {
        yield put({
            type: REVIEW_ERROR,
            error: "review saga Error"
        });
    }
}

function* catchReview() {
    yield takeEvery(REVIEW_REQUEST, reviewRequest);
}
export default function* reviewSaga() {
    yield all([
        fork(catchReview),
    ]);
}