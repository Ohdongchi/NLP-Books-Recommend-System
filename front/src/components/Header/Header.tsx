import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer/RootReducer";
import { useCookies } from "react-cookie";
import {
  Reg_modal_Request,
  Login_Modal_Request,
} from "../../redux/reducer/ModalReducer";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import path from "path";

import IsToken from "./isToken";
import IsNotToken from "./isNotToken";
import { SearchBooksRequest } from "../../redux/reducer/SearchBooksReducer";

type title_type = {
  title: string;
};

const Header: React.FC<RouteComponentProps & title_type> = ({
  match,
  history,
  location,
  title,
}) => {
  const isLoginedState = useSelector(
    (state: RootState) => state.LoginReducer.res
  );

  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies(["Token"]);
  const temp = useSelector(
    (state: RootState) => state.ModalReducer.Login_modal
  );

  const searchRef = useRef(null);

  const RegisterModalHandler = () => dispatch(Reg_modal_Request());

  const LoginModalHandler = () => dispatch(Login_Modal_Request());

  const onKeyPressHanlder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (e.currentTarget.value != "") {
        dispatch(SearchBooksRequest(e.currentTarget.value));
        history.push({
          pathname: `/book/search`,
          state: { keyword: e.currentTarget.value },
        });
      }
    }
  };

  return (
    <>
      <header>
        <div className="header-container">
          <h1>
            <Link to="/">{title}</Link>
          </h1>
          <div className="header-menu">
            <span>
              {/* <Link to="/book/search"> */}
                <input
                  className="search-bar"
                  ref={searchRef}
                  size={40}
                  placeholder="검색어를 입력하세요 !"
                  onKeyPress={onKeyPressHanlder}
                />
              {/* </Link> */}
            </span>
            {isLoginedState == "" ? (
              <IsNotToken
                RegisterModalHandler={RegisterModalHandler}
                LoginModalHandler={LoginModalHandler}
              />
            ) : (
              <IsToken />
            )}
            <Link to="/">
              <input id="home-button" type="button" value="Home" />
            </Link>
            {/* <Link to="/test">
              <input id="test-button" type="button" value="test" />
            </Link> */}
          </div>
        </div>
      </header>
    </>
  );
};
export default withRouter(Header);
