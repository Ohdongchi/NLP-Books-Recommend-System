import React, { useCallback, useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducer/RootReducer";
import { Cookies } from "react-cookie";
import axios from "axios";
import { DetailRequest } from "../../redux/reducer/BookDetailReducer";
import { TFIDF_Request } from "../../redux/reducer/ai/TFIDF_Reducer";

const TF_IDF = ({ isbn }: any) => {
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
      dispatch(TFIDF_Request(isbn));
  }, [user]);



  const TFIDF_data = useSelector(
    (state: RootState) => state.TFIDF_Reducer.TFIDF_data
  );

  return (
    <div>
      <h3>선택한 도서와 유사한 도서 추천</h3>
      <div className="TFIDF_Container">
        {
          user ? TFIDF_data.length < 1 ? (
            <p>정보가 부족해 추천 서비스가 불가능합니다.</p>
          ) : (
            TFIDF_data.map((data: any) => {
              return (
                <Link
                  to={"/book/detail/" + data.isbn}
                  onClick={() => dispatch(DetailRequest(data.isbn))}
                  key={data.isbn}
                >
                  <div className="TFIDF_item">
                    <img src={data.image_url} />
                    <p>{data.title}</p>
                    <p>{data.sub_title}</p>
                  </div>
                </Link>
              );
            })
          ) : <p>로그인 해주세요.</p>
        }
      </div>
    </div>
  );
};

export default TF_IDF;
