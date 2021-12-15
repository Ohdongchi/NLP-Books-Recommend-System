import React, { useState, useEffect } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { useCookies, withCookies, Cookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer/RootReducer";
import { BestRequest } from "../redux/reducer/BestSellerReducer";

import axios from "axios";
import { Helmet } from "react-helmet";
// css
import "../css/main.css";
import "../css/bestSeller.css";
import "../css/register.css";
import "../css/Login.css";
import "../css/Mypage.css";
import "../css/BookDetail.css";
import "../css/TF_IDF.css";
import "../css/review-list.css";
import "../css/itemCF.css";
import "../css/userCF.css";
import "../css/Doc2vec.css";
import "../css/BookSearch.css";

// components
import Header from "./Header/Header";
import Content from "./Main/MainContent";
import RegisterPage from "./AuthPage/Register";
import LoginPage from "./AuthPage/Login";
import Mypage from "./Mypage";
import BooksDetail from "./Details/Book.detail";
import BookSearchPage from "./Main/BookSearchPage";
import Test from "./Test";

import { TokToU_Request } from "../redux/reducer/TokenToUserReducer";
const App = () => {
  // const [cookies, setCookie, removeCookie] = useCookies([]);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>();
  const [checkCookie, setCheckCookie] = useState<boolean>(false);
  // register modal
  const RegisterModalState = useSelector(
    (state: RootState) => state.ModalReducer.Reg_modal
  );
  // login modal
  const LoginModalState = useSelector(
    (state: RootState) => state.ModalReducer.Login_modal
  );

  const JWT_TOken = useSelector((state: RootState) => state.LoginReducer.res);

  const fetchToUser = () => {
    if (checkCookie) {
      axios.get(`http://localhost:3001/auth/profile?token=${cookies.get("userToken")}`)
        .then(res => {
          setUser(res.data);
        });
    }
  }

  useEffect(() => {
    if (JWT_TOken != "") {
      cookies.set("userToken", JWT_TOken, {
        path: "/",
        httpOnly: false,
      });
      setCheckCookie(true);
    }
  }, [JWT_TOken]);

  useEffect(() => {
    fetchToUser();
  }, [checkCookie]);

  useEffect(() => {
    dispatch(BestRequest());
  }, [dispatch]);

  return (
    <>
      <Header title="IT PEDIA" />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/mypage" exact component={Mypage} />
          <Route path="/book/detail/:isbn" exact component={BooksDetail} />
          <Route path="/test" exact component={Test} />
          <Route path="/book/search" exact component={BookSearchPage} />
        </Switch>
      </div>
      {LoginModalState ? <LoginPage /> : null}
      {RegisterModalState ? <RegisterPage /> : null}

    </>
  );
};

export default withCookies(App);
