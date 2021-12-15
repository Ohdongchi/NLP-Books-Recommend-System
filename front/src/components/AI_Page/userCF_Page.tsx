import React, { useState, useCallback, useEffect, useMemo, useLayoutEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserCF_Request } from "../../redux/reducer/ai/User_Collaboration_Filtering_Reducer";
import { StatusTypes } from "react-async";
import { RootState } from "../../redux/reducer/RootReducer";
import { Cookies, useCookies } from "react-cookie";
import { DetailRequest } from "../../redux/reducer/BookDetailReducer";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
const UsercfPage = ({ userid }: any) => {
  const dispatch = useDispatch();
  const jwt_Token = useSelector((state: RootState) => state.LoginReducer.res);
  const cookies = new Cookies();
  const [user, setUser] = useState<any>(null);

  const [checkCookie, setCheckCookie] = useState<boolean>(false);
  const JWT_TOken = useSelector((state: RootState) => state.LoginReducer.res);

  const fetchToUser = useCallback(() => {
    if (checkCookie) {
      axios.get(`http://localhost:3001/auth/profile?token=${cookies.get("userToken")}`)
        .then(res => {
          setUser(res.data);
        });
    }
  }, [checkCookie]);

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
      dispatch(UserCF_Request(user?.userId));
  }, [user]);

  const userCF_data = useSelector(
    (state: RootState) => state.User_CF_Reducer.UserCF_data
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
      <div >
        <h3 className="UserCF_title"> 사용자와 취향이 비슷한 사용자들을 기반으로 추천하는 도서  </h3>
        <div className="UserCF_Container">
          {
            user ?
              userCF_data < 1 ? (<p>정보가 부족해 추천 서비스 이용이 불가능 합니다.</p>) : (
                <Slider {...settings}>
                  {
                    userCF_data.map((data: any) => {
                      return (
                        <Link
                          className="UserCF_item"
                          to={"/book/detail/" + data.isbn}
                          onClick={() => dispatch(DetailRequest(data.isbn))}
                          key={data.isbn}
                        >
                          <div className="UserCF_item_div">
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
    // <div>
    //   <h3 className="usercf_title">사용자와 취향이 비슷한 사람들의 추천 !</h3>
    //   <div className="userCF_Container">
    //     {
    //       user ? userCF_data.length < 1 ? (
    //         <p>정보가 부족해 추천 서비스가 불가능합니다.</p>
    //       ) : (
    //         <Slider {...settings}>{
    //           userCF_data.map((data: any) => {
    //             return (
    //               <Link
    //                 to={"/book/detail/" + data.isbn}
    //                 onClick={() => dispatch(DetailRequest(data.isbn))}
    //                 key={data.isbn}
    //               >
    //                 <div className="userCF_item">
    //                   <img src={data.image_url} />
    //                   <p>{data.title}</p>
    //                   <p>{data.sub_title}</p>
    //                 </div>
    //               </Link>
    //             );
    //           })
    //         }
    //         </Slider>
    //       ) : <p>로그인하셈</p>
    //     }
    //   </div>
    // </div>
  );
};

export default UsercfPage;
