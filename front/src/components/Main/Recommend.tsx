import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducer/RootReducer";
import { Cookies } from "react-cookie";
import UserCF_Page from "../AI_Page/userCF_Page";
import ItemCF_Page from "../AI_Page/itemCF_Page";
import DocToVec_Page from "../AI_Page/DocToVecPage";
const Recommand = () => {
  
  const cookie = new Cookies();

  return(
    <div className="Recommend-Container">
      <UserCF_Page />
      <ItemCF_Page />
      <DocToVec_Page />
    </div>
  );
};

export default Recommand;
