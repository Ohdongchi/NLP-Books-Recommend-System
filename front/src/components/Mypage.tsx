import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


const Mypage = () => {

  const [themeData, setThemeData] = useState<any[]>([
    {
      isbn: "9790000000000",
      title: "블러드본 아트웍스",
      writer: "소니인터렉티브엔터테인먼트, 프롬소프트웨어 저",
      image: "http://image.yes24.com/goods/77724689/800x0",
      comment: "정말 좋은 책입니다 !"
    },
    {
      isbn: "9790000000000",
      title: "레트로의 유니티 게임 프로그래밍 에센스",
      writer: "이제민 저",
      image: "http://image.yes24.com/goods/69320872/800x0",
      comment: "정말 많은 걸 배워가는 책입니다 !"
    },
    {
      isbn: "9790000000000",
      title: "유니티 교과서",
      writer: "기타무라 마나미 저/김은철, 유세라 역",
      image: "http://image.yes24.com/goods/97155864/800x0",
      comment: "정말 감동적인 책입니다 !"
    }
  ]);


  return (
    <div className="Mypage">
      <div className="Mypage_menu">
        <table>
          <tr>
            <td><Link to="/register_out">회원탈퇴</Link></td>
            <td><Link to="/register_out">회원탈퇴</Link></td>
            <td><Link to="/register_out">회원탈퇴</Link></td>
            <td><Link to="/register_out">회원탈퇴</Link></td>
          </tr>
        </table>
      </div>
      <div className="Mypage_comment_Books_List_section">
        <h2>내가 댓글 단 책 목록</h2>
        <section>
          {
            themeData.map(data => {
              return (
                <div key={data.isbn}>
                  <div>
                    <img src={data.image} />
                  </div>
                  <div>
                    <h4>{data.title}</h4>
                    <h4>{data.writer}</h4>
                    <div>
                      <h4>나의 댓글 : {data.comment}</h4>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </section>
      </div>
    </div>
  );
};

export default Mypage;
