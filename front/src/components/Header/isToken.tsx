import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginInit } from "../../redux/reducer/LoginReducer";
import { useDispatch } from "react-redux";
import { useCookies, Cookies } from "react-cookie";
const isToken = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();

    const onLogoutHandler = () => {
        cookies.remove("userToken");
        dispatch(LoginInit());
    }

    return (
        <>
            <Link to="/mypage"><input type="button" value="My page" /></Link>
            <input type="button" value="Logout" onClick={onLogoutHandler} />
        </>
    );
};

export default isToken;