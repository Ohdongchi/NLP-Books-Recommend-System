import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

import { BOOK_DETAIL_REQUEST, BOOK_DETAIL_RESPONSE, BOOK_DETAIL_ERROR } from "../reducer/BookDetailReducer"

const BookDetailAPI = (isbn: string) => {
    return axios.get(`http://localhost:3001/book/detail/${isbn}`);
}

function* BookDetailRequest({ payload }:any  /*isbn*/) {
    try {
        const {data} = yield call(BookDetailAPI, payload);

        yield put({
            type:BOOK_DETAIL_RESPONSE,
            payload:data
        });

    } catch {
        yield put({
            type:BOOK_DETAIL_ERROR,
            error:"Book Detail Saga Error"
        });
        // console.log("BookDetailRequest Error", payload);
    }
}

function* catchBookDetailRequest() {
    yield takeEvery(BOOK_DETAIL_REQUEST, BookDetailRequest);
}

export default function* BookDetailSaga() {
    yield all([
        fork(catchBookDetailRequest),
    ]);
}