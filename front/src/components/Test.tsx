import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { DetailRequest } from "../redux/reducer/BookDetailReducer";
import { RootState } from "../redux/reducer/RootReducer";

type testProps = {
    onTest: () => void,
}

const Test = ({ onTest }: testProps) => {

    const dispatch = useDispatch();

    const testData = useSelector(
        (state: RootState) => state.DocToVec_Reducer.DocToVec_data
    );
    // slick test
    var settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
    };
    const [user, setUser] = useState<any>(true);

    return (
        <>
            <div>
                <h3 className="Doctovec_title"> 사용자가 가장 최근에 읽은 도서 </h3>
                <div className="Doctovec_Container">
                    {
                        user ? 
                        testData < 1 ? (<p>정보가 부족해 추천 서비스 이용이 불가능 합니다.</p>) : (
                            <Slider {...settings}>
                                {
                                    testData.map((data: any) => {
                                        return (
                                            <Link
                                                className="Doctovec_item"
                                                to={"/book/detail/" + data.isbn}
                                                onClick={() => dispatch(DetailRequest(data.isbn))}
                                                key={data.isbn}
                                            >
                                                <div className="Doctovec_item_div">
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
}

export default Test;