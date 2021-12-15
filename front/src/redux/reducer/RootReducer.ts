import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import BestReducer from "./BestSellerReducer";
import EmailValidationReducer from "./EmailValidationReducer";
import BookDetailReducer from "./BookDetailReducer";
import LoginReducer from "./LoginReducer";
import User_CF_Reducer from "./ai/User_Collaboration_Filtering_Reducer";
import Item_CF_Reducer from "./ai/Item_Collaboration_Filtering_Reducer";
import TFIDF_Reducer from "./ai/TFIDF_Reducer";
import TokenToUserReducer from "./TokenToUserReducer";
import SearchBooksReducer from "./SearchBooksReducer";
import DocToVec_Reducer from "./ai/DocToVec_Reducer";
import ReviewReducer from "./Get_ReviewReducer";
const rootReducer = combineReducers({
    ModalReducer,
    BestReducer,
    EmailValidationReducer,
    BookDetailReducer,
    LoginReducer,
    User_CF_Reducer,
    Item_CF_Reducer,
    TFIDF_Reducer,
    DocToVec_Reducer,
    TokenToUserReducer,
    SearchBooksReducer,
    ReviewReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;