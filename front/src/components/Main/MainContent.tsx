import React from "react";
import { useCookies, Cookies } from "react-cookie";

import BestSeller from "./BestSeller";
import Recommend from "./Recommend";


const Content = () => {

    const cookie = new Cookies();

    return (
        <>
            <BestSeller />
            <Recommend />
            
        </>
    )    
};

export default Content;