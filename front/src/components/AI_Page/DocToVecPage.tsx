import React, { useCallback, useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

import { RootState } from "../../redux/reducer/RootReducer";
import { DetailRequest } from "../../redux/reducer/BookDetailReducer";
import { Doc_To_Vec_Request } from "../../redux/reducer/ai/DocToVec_Reducer";
import Slider, { Settings } from "react-slick";


const DocToVec = ({ isbn }: any) => {
    const dispatch = useDispatch();
    const jwt_Token = useSelector((state: RootState) => state.LoginReducer.res);
    const cookies = new Cookies();
    const [user, setUser] = useState<any>(null);

    const [checkCookie, setCheckCookie] = useState<boolean>(false);
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
          dispatch(Doc_To_Vec_Request(user?.userId));
      }, [user]);
    const Doctovec_data = useSelector(
        (state: RootState) => state.DocToVec_Reducer.DocToVec_data
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
            <div id="testid">
                <h3 className="Doctovec_title">최근에 읽은 도서를 기반으로 인공지능이 추천하는 도서</h3>
                <div className="Doctovec_Container">
                    {
                        user ?
                            Doctovec_data < 1 ? (<p>정보가 부족해 추천 서비스 이용이 불가능 합니다.</p>) : (
                                <Slider {...settings}>
                                    {
                                        Doctovec_data.map((data: any) => {
                                            return (
                                                <div className="Doctovec_item_div" key={data.isbn}>
                                                    <Link
                                                        className="Doctovec_item"
                                                        to={"/book/detail/" + data.isbn}
                                                        onClick={() => dispatch(DetailRequest(data.isbn))}
                                                        key={data.isbn}
                                                    >
                                                        <img src={data.image_url} />
                                                        <p>{data.title}</p>
                                                        <p>{data.sub_title}</p>
                                                    </Link>
                                                </div>
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

export default DocToVec;
