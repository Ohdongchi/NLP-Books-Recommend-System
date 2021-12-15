import { all, fork, takeLatest, call, put } from "@redux-saga/core/effects";
import BestSellerSaga from "./BestSellerSaga";
import BookDetailSaga from "./Book.Detail.Saga";
import EmailValidationSaga from "./EmailValidationSaga";
import LoginRequestSaga from "./LoginSaga";
import UserCF_Saga from "./ai/UserCF_Saga";
import ItemCF_Saga from "./ai/ItemCF_Saga";
import TFIDFSaga from "./ai/TFIDF_Saga";
import TokenToUserSaga from "./TokenToUserSaga"
import Doctovec_Saga from "./ai/DocToVec_Saga";
import SearchRequestSaga from "./SearchBooksSaga";
import ReviewSaga from "./ReviewSaga";
export default function* rootSaga() {
    yield all([
        fork(BestSellerSaga),
        fork(EmailValidationSaga),
        fork(BookDetailSaga),
        fork(LoginRequestSaga),
        fork(UserCF_Saga),
        fork(ItemCF_Saga),
        fork(TFIDFSaga),
        fork(Doctovec_Saga),
        fork(SearchRequestSaga),
        fork(ReviewSaga)
    ]);
}