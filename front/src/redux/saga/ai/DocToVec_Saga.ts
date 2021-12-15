import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import { DOC_TO_VEC_REQUEST, DOC_TO_VEC_RESPONSE, DOC_TO_VEC_ERROR } from "../../reducer/ai/DocToVec_Reducer";
const DocToVec_API = async (userid: number) => {
    const res = await axios.get(`http://localhost:3001/book/doc2vec/${userid}`);
    
    return res;
};

function* Doctovec_Request({ payload }: any) {
    try {
        const { data } = yield call(DocToVec_API, payload);
        yield put({
            type: DOC_TO_VEC_RESPONSE,
            payload: data
        });
    }
    catch {
        yield put({
            type: DOC_TO_VEC_ERROR,
            error: "DOC_TO_VEC_SAGA_ERROR"
        });
    }
}


function* catch_Doctovec_Request() {
    yield takeEvery(DOC_TO_VEC_REQUEST, Doctovec_Request);
}

export default function* Doctovec_Saga() {
    yield all([
        fork(catch_Doctovec_Request),
    ]);
}