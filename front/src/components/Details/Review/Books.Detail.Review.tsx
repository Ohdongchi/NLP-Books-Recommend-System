// default modules
import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Cookies, useCookies } from "react-cookie";
import { RootState } from "../../../redux/reducer/RootReducer";
import { getReview } from "../../../redux/reducer/Get_ReviewReducer";

const Review = ({ isbn }: any) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [review, setReview] = useState<string>("");
  const [avg, setAvg] = useState<string>("");
  const [checkCookie, setCheckCookie] = useState<boolean>(false);
  const cookies = new Cookies();

  const JWT_TOken = useSelector((state: RootState) => state.LoginReducer.res);
  const reviewData = useSelector(
    (state: RootState) => state.ReviewReducer.review
  );
  const fetchToUser = () => {
    if (checkCookie)
      axios
        .get(
          `http://localhost:3001/auth/profile?token=${cookies.get("userToken")}`
        )
        .then((res) => {
          setUser(res.data);
        });
  };
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

  const onChangeReviewhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.currentTarget.value);
  };

  // review writer
  const onSubmitReviewHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (review.length > 5) {
      // review 데이터 전송
      axios
        .post("http://localhost:3001/review/createReview", [review, isbn, avg])
        .then((res) => {
          dispatch(getReview(isbn));
        });
      // review input init
      setReview("");
    }
    setAvg("0");
    return false;
  };

  useEffect(() => {
    dispatch(getReview(isbn));
  }, [dispatch]);

  const onChangeReviewAvg = (e: React.FormEvent<HTMLInputElement>) => {
    setAvg(e.currentTarget.value);
  };

  return (
    <>
      {user ? (
        <div>
          <form id="review-form" onSubmit={onSubmitReviewHandler}>
            <div id="review-form-input-box">
              <input
                type="text"
                placeholder="리뷰 입력 (5자 이상)"
                onChange={onChangeReviewhandler}
                value={review}
              />
              <span>{review.length}/50</span>
            </div>
            <input
              type="number"
              placeholder="0.0"
              size={2}
              onChange={onChangeReviewAvg}
              value={avg}
            />
            <input type="submit" value="입력" />
          </form>
        </div>
      ) : (
        ""
      )}
      <div className="review-list">
        {reviewData.map((data: any) => {
          return (
            <div>
              <p>{data.review}</p>
              <div>
                <span>{data.nickname}</span> | <span>{data.email}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Review;
