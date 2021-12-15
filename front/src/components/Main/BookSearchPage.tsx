import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useCookies, Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  RouteComponentProps,
  withRouter,
  useHistory,
  useLocation,
} from "react-router";
import { RootState } from "../../redux/reducer/RootReducer";

const BookSearch: React.FC<RouteComponentProps> = ({
  match,
  history,
  location,
}) => {
  const cookie = new Cookies();
  const dispatch = useDispatch();

  const SearchData = useSelector(
    (state: RootState) => state.SearchBooksReducer.search_books
  );
  useEffect(() => { }, [location.pathname]);

  useEffect(() => { }, [SearchData]);

  return (
    <>
      <div className="Search-book-container">
        <h3 > 검색 결과 </h3>
        <div className="Search-book-box">
          {SearchData &&
            SearchData.map((data: any) => {
              return (
                <div className="Search-grid_item">
                  <img src={data.image_url} />
                  <p>{data.title}</p>
                  <p>{data.writer ? data.writer : null}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default withRouter(BookSearch);
