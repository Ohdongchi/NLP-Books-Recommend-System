import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

import { TFIDF_REQUEST, TFIDF_RESPONSE, TFIDF_ERROR } from "../../reducer/ai/TFIDF_Reducer";

const TFIDT_API = async (isbn:number) => {
    const res = await axios.get(`http://localhost:3001/book/TFIDF/${isbn}`);
    
    return res;
};

function* TFIDF_Request({ payload }: any) {
    try {
        const {data} = yield call(TFIDT_API, payload);
    
        yield put({
            type:TFIDF_RESPONSE,
            payload:data
        });
    }
    catch {
        yield put({
            type:TFIDF_ERROR,
            error:"TFIDF_SAGA_ERROR"
        });
    }
}


function* catch_TFIDF_Request() {
    yield takeEvery(TFIDF_REQUEST, TFIDF_Request);
}

export default function* TFIDF_Saga() {
    yield all([
        fork(catch_TFIDF_Request),
    ]);
}