import React from "react";
import axios from "axios";

type isNotTokenProps = {
    RegisterModalHandler: ()=> void,
    LoginModalHandler: ()=> void
};


const isNotToken = ({ RegisterModalHandler, LoginModalHandler }: isNotTokenProps) => {

    return (
        <>
            <input type="button" value="Register" onClick={RegisterModalHandler} />
            <input type="button" value="Login" onClick={LoginModalHandler} />
        </>
    );
};

export default isNotToken;