import React, { useState, useCallback, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ItemCF_Init, ItemCF_Request } from "../../redux/reducer/ai/Item_Collaboration_Filtering_Reducer";
import { StatusTypes } from "react-async";
import { RootState } from "../../redux/reducer/RootReducer";
import { Cookies } from "react-cookie";

import { Link } from "react-router-dom";
import { DetailRequest } from "../../redux/reducer/BookDetailReducer";
import { useCookies } from "react-cookie";
import Slider, { Settings } from "react-slick";

const ItemCF_Page = ({ userid }: any) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [user, setUser] = useState<any>(null);
  const [checkCookie, setCheckCookie] = useState<boolean>(false);
  const JWT_TOken = useSelector((state: RootState) => state.LoginReducer.res);
  const fetchToUser = () => {
    if (checkCookie)
      axios.get(`http://localhost:3001/auth/profile?token=${cookies.get("userToken")}`)
        .then(res => {
          setUser(res.data);
        });
  }
  useEffect(() => {
    if (JWT_TOken != "") {
      
      cookies.set("userToken", JWT_TOken, {
        path: "/",
        httpOnly: false,
      });
      setCheckCookie(true);
    } else {
      setUser(null);
      setCheckCookie(false);
    }
  }, [JWT_TOken]);

  useEffect(() => {
    fetchToUser();
  }, [checkCookie]);

  useLayoutEffect(() => {
    if (user != null)
      dispatch(ItemCF_Request(user?.userId));
  }, [user]);

  const itemCF_data = useSelector(
    (state: RootState) => state.Item_CF_Reducer.ItemCF_data
  );


  var settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <div>
        <h3 className="ItemCF_title">사용자의 평가 이력을 기반으로 추천하는 도서 </h3>
        <div className="ItemCF_Container">
          {
            user ?
              itemCF_data < 1 ? (<p>정보가 부족해 추천 서비스 이용이 불가능 합니다.</p>) : (
                <Slider {...settings}>
                  {
                    itemCF_data.map((data: any) => {
                      return (
                        <Link
                          className="ItemCF_item"
                          to={"/book/detail/" + data.isbn}
                          onClick={() => dispatch(DetailRequest(data.isbn))}
                          key={data.isbn}
                        >
                          <div className="ItemCF_item_div">
                            <img src={data.image_url} />
                            <p>{data.title}</p>
                            <p>{data.sub_title}</p>
                          </div>
                        </Link>
                      );
                    })
                  }
                </Slider>)
              : <p>로그인 해주세요.</p>
          }
        </div>
      </div>
    </>
  );
};

export default ItemCF_Page;
