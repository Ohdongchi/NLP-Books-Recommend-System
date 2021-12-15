import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";

import {SEARCH_REQUEST, SEARCH_RESPONSE, SEARCH_ERROR } from "../reducer/SearchBooksReducer";

const SearchAPI = async (value:any) => {
    return await axios.get(`http://localhost:3001/book/search/${value}`);
}

function* SearchRequest ({payload}:any) {
    try{
        const {data}=yield call(SearchAPI, payload)
        yield put({
            type:SEARCH_RESPONSE,
            payload:data
        });
    } catch(err) {
        put({
            type:SEARCH_ERROR,
            error:err
        });
        console.log("error");
    }
}

function* catchSearchRequest() {
    yield takeEvery(SEARCH_REQUEST, SearchRequest);
}

export default function* SearchRequestSaga() {
    yield all([fork(catchSearchRequest)]);
}