import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import { BEST_REQUEST, BEST_RESPONSE } from "../reducer/BestSellerReducer";

const BestSellerAPI = () => {
    // console.log("BestSellerAPI");
    return axios.get("http://localhost:3001/book/BestSeller");
};

function* BestSellerRequest({ payload }: any) {
    try {
        const {data} = yield call(BestSellerAPI);
        // console.log(data);
        yield put({
            type:BEST_RESPONSE,
            payload:data
        });
    }
    catch {
        console.log("saga error");
    }
}


function* catchBestSellerRequest() {
    yield takeEvery(BEST_REQUEST, BestSellerRequest);
}

export default function* BestSellerSaga() {
    yield all([
        fork(catchBestSellerRequest),
    ]);
}