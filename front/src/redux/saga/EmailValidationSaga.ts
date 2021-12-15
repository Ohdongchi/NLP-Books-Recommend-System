import { all, fork, takeEvery, call, put } from "@redux-saga/core/effects";
import axios from "axios";
import { EMAIL_VALIDATION_REQUEST, EMAIL_VALIDATION_RESPONSE, EMAIL_VALIDATION_ERROR } from "../reducer/EmailValidationReducer";


const EmailValidationAPI = async (email: any) => {
    return await axios.post("http://localhost:3001/auth/eval", {email:email});
}

function* EmailValidationRequest({ payload }: any) {
    try {
        const { data } = yield call(EmailValidationAPI, payload);
        yield put({
            type: EMAIL_VALIDATION_RESPONSE,
            payload: data,
        });

    } catch {
        yield put({
            type: EMAIL_VALIDATION_ERROR,
            payload: "error"
        });
        // console.log("saga error");
    }
}

function* catchEmailValidationRequest() {
    // console.log("catch");
    yield takeEvery(EMAIL_VALIDATION_REQUEST, EmailValidationRequest);
}

export default function* EmailValidationSaga() {
    // console.log("saga");
    yield all([
        fork(catchEmailValidationRequest),
    ]);
}