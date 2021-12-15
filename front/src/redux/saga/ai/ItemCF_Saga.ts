import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

import { ITEM_CF_REQUEST, ITEM_CF_RESPONSE, ITEM_CF_ERROR } from "../../reducer/ai/Item_Collaboration_Filtering_Reducer";

const ItemCF_API = async (userid:number) => {
    const res = await axios.get(`http://localhost:3001/book/itemcf/${userid}`);
    return res;
};

function* Item_CF_Request({ payload }: any) {
    try {
        const {data} = yield call(ItemCF_API, payload);
        yield put({
            type:ITEM_CF_RESPONSE,
            payload:data
        });
    }
    catch {
        yield put({
            type:ITEM_CF_ERROR,
            error:"ITEM_CF_SAGA_ERROR"
        });
        // console.log("saga error");
    }
}


function* catch_Item_CF_Request() {
    yield takeEvery(ITEM_CF_REQUEST, Item_CF_Request);
}

export default function* Item_CF_Saga() {
    yield all([
        fork(catch_Item_CF_Request),
    ]);
}