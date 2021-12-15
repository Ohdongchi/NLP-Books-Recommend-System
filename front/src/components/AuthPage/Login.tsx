import axios from "axios";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoginRequest } from "../../redux/reducer/LoginReducer";
import { Login_Modal_Request } from "../../redux/reducer/ModalReducer";
import { RootState } from "../../redux/reducer/RootReducer";

type Login_submit_type = {
  email: string,
  password: string,
};

const LoginPage = () => {

  // Redux
  const dispatch = useDispatch();


  const onModalHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    const targetClassname = e.target as HTMLDivElement;
    if (targetClassname.className == "Login-container") {
      dispatch(Login_Modal_Request());
    }
  }

  const [Email, setEmail] = useState<string>("example962@example.com");
  const [Password, setPassword] = useState<string>("12345");

  const [loginFormData, setLoginFormData] = useState<Login_submit_type>();
  // hooks
  useEffect(() => {
    setLoginFormData({
      email: Email,
      password: Password
    })
  }, [Email, Password]);

  // Handler
  const onEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LoginRequest([Email, Password]));
    dispatch(Login_Modal_Request());
    return true;
  };

  return (
    <div className="Login-container" onClick={onModalHandler}>
      <div className="Login-box">
        <div className="Login-title">
          <h2>IT PEDIA</h2>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="Login-box-email">
            <label>Email</label>
            <input type="email" placeholder="write your email" value={Email} onChange={onEmailChangeHandler} />
          </div>
          <div className="Login-box-password">
            <label>Password</label>
            <input type="password" placeholder="write your password" value={Password} onChange={onPasswordHandler} />
          </div>
          <div className="Login-form-submit">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;