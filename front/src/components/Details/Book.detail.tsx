// default modules
import React, { useCallback, useState, useEffect } from "react";

// components
import BookDetailHeader from "./Book.Detail.Header";
import BookDetailIntro from "./Book.Detail.Intro";
import BookDetailInfo from "./Book.Detail.info";
import Review from "./Review/Books.Detail.Review";
import TF_IDF from "../AI_Page/TF_IDF_Page";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/RootReducer";
import { getReview } from "../../redux/reducer/Get_ReviewReducer";
// import TF_IDF from "../AI_Page/TF_IDF_Page";

const detail = ({ match }: any) => {
  // 파라미터로 books id 값 받기
  const bookData = useSelector(
    (state: RootState) => state.BookDetailReducer.res
  );
  const dispatch = useDispatch();
  // review만 가져오는 reducer 따로 만들기

  return (
    <div className="BookDetail">
      {bookData.slice(0, 1).map((data: any) => {
        return (
          <>
            <BookDetailHeader title={data.title} sub_title={data.sub_title} />
            <BookDetailIntro image_url={data.image_url} intro={data.intro} />
            <BookDetailInfo
              writer={data.writer}
              publisher_name={data.publisher_name}
              publication_date={
                data.publication_date.replace("T", " ").split(" ")[0]
              }
              category={data.category}
              hit={data.hit}
            />
          </>
        );
      })}
      <div className="Similar-book-container">
        <TF_IDF isbn={match.params.isbn} />
      </div>
      <div className="reivew-container">
        <Review isbn={match.params.isbn} />
      </div>
    </div>
  );
};

export default detail;
