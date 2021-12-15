import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BestRequest } from "../../redux/reducer/BestSellerReducer";
import { DetailRequest } from "../../redux/reducer/BookDetailReducer";

import { RootState } from "../../redux/reducer/RootReducer"
const bestSeller = () => {

 const dispatch = useDispatch();


const imageUrl = useSelector((state: RootState) =>state.BestReducer.data);
const [books, setBooks] = useState<string[]>(imageUrl.slice(0, 4));
const [count, setCount] = useState<number>(4);

useEffect(() => {
  setBooks(imageUrl.slice(0, 4));
}, [imageUrl]);

// const testHandler = () => {
//   console.log(books);
// }

const imageHandler = (data: string) => {
  let tempArray = [];
  let cnt = count;

  if (data === "next") {
    for (let i = 0; i < 4; i++) {
      if (cnt > imageUrl.length - 1) {
        cnt = 0;
      }
      tempArray.push(imageUrl[cnt]);
      cnt++;
    }
    setCount(cnt);
    setBooks(tempArray);

  } else {
    for (let i = 0; i < 4; i++) {
      cnt--;
      if (cnt < 0) {
        cnt = imageUrl.length - 1;
      }
      tempArray.push(imageUrl[cnt]);
    }
    setCount(cnt);
    setBooks(tempArray);
  }
}

return (
  <>
    <div className="container">
      <h3 className="content_title" >Best Seller</h3>
      <div className="box">
        <div className="prev" onClick={() => {
          imageHandler("prev");
        }}>
          <span className="material-icons ">chevron_left</span>
        </div>
        <div
          className="next"
          onClick={() => {
            imageHandler("next");
          }}>
          <span className="material-icons">chevron_right</span>
        </div>
        <div className="image_box">
          {books.map((data: any) => {
            return (
              <div key={data.isbn}>
                <Link to={"/book/detail/" + data.isbn} onClick={()=>dispatch(DetailRequest(data.isbn))}>
                  <img src={data.image_url} />
                  <p>{data.title}</p>
                  <p>{data.sub_title == " " ? " " : data.sub_title}</p>
                  <p>{data.writer}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </>
);
};

export default bestSeller;
