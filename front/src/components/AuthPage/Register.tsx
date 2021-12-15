import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useAsync } from "react-async";
import { RootState } from "../../redux/reducer/RootReducer";
import { Reg_modal_Request } from "../../redux/reducer/ModalReducer";
import { emailvalidationRequestFunc } from "../../redux/reducer/EmailValidationReducer";



type Register_submit_type = {
  password: string,
  nickname: string,
  email: string,
  image_url: string,
};

const RegisterPage = () => {

  // Redux
  const dispatch = useDispatch();

  const onModalHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    const targetClassname = e.target as HTMLDivElement;
    if (targetClassname.className == "Register-container") {
      dispatch(Reg_modal_Request());
    }
  }

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<boolean>(false);


  const [nickname, setNickName] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [image_url, setImageUrl] = useState<string>("");
  // const [checkNumber, setCheckNumber] = useState<string>();

  const [formData, setFormData] = useState<Register_submit_type>({
    password: "",
    nickname: "",
    email: "",
    image_url: "",
  });

  const emailValidation = useSelector((state: RootState) => state.EmailValidationReducer.res);
  
  // submit 나중에 꼭 최적화 하기 !!
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // let passwordRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    // if (!passwordRegExp.test(password)) {
    //   setPasswordError("password를 확인해주세요. 특문 포함 8~15자 입니다.");
    // } else {
    //   setPasswordError("");
    // }

    // console.log(emailError+ " " + passwordError);
    // if (!emailError && !passwordError) {
    //   axios.post("http://localhost:3001/auth/register", [email, password, nickname, image_url]).then(res=>{console.log(res.data);});
    // }
    axios.post("http://localhost:3001/auth/register", [email, password, nickname, image_url]).then(res=>{console.log(res.data);});
    dispatch(Reg_modal_Request());
    return true;
  };

  // onChange state
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }

  const onChangeImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.files);
  }

  const emaliValidationHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    let emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    console.log(email, emailRegExp.test(email));
    if (emailRegExp.test(email)) {
      console.log("validation");
      dispatch(emailvalidationRequestFunc(email));
    }
    return;
  }


  return (
    <>
      <div className="Register-container" onClick={onModalHandler}>
        <div className="Register-box">
          <div className="Register-title">
            <h2>IT PEDIA</h2>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="Register-box-email">
              <label>Email</label>

              <input type="email" placeholder="write your email" onChange={onChangeEmail} value={email} />
              <input type="button" value="중복체크" onClick={emaliValidationHandler} />
              {
                emailValidation == true ? <p>사용이 불가능한 이메일 입니다.</p>:null
              }
            </div>
            <div className="Register-box-paswword">
              <label>Password</label>
              <input name="password" type="password" placeholder="write your paswword" onChange={onChangePassword} value={password} />
              <p>{passwordError}</p>
            </div>
            <div className="Register-box-name">
              <label>Nick name</label>
              <input name="nickname" type="text" placeholder="write your name" onChange={onChangeName} value={nickname} />
              {nickname.length > 2 ? <p></p> : <p>nickname 확인 해주세요. 3글자 이상입니다.</p>}
            </div>
            <div className="Register-box-name">
              <label>Select your profile Image</label>
              <input name="imageUrl" type="file" onChange={onChangeImageUrl} accept="image/*" />
            </div>
            <div className="Register-form-submit">
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

// setState에서 2번 째 인자로 callback function이 있었지만 지금은 없어지고,
  // useEffect로 해야한다.
  // useEffect(() => {
  //   setFormData({
  //     password: password || "",
  //     nickname: nickname || "",
  //     email: email || "",
  //     image_url: image_url || "",
  //   });
  // }, [password, nickname, email]);

   // if (nickname !== "" && emailError == "" && passwordError == "") {
    //   console.log(nickname + " " + emailError + " " + passwordError);
    //   console.log(formData);
    //   axios.post("http://localhost:3001/auth/register", formData);
    //   dispatch(Reg_modal_Request());
    // }