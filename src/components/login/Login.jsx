import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { loginApi } from "../../api/loginApi";
import Cookies from "js-cookie";
import { access_token, username } from "../../store/login";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { loginApi } from "../../api/loginApi";

function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [user, setUser] = useRecoilState(username);

  const onSubmit = (data) => {
    const getToken = async () => {
      try {
        const response = await loginApi.getToken(data);

        setAccessToken(response.data.data[0].accessToken);
        // setAccessToken(
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2hhbmdobTEiLCJwYXNzd29yZCI6IiIsImF2YXRhciI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2Ivb25lcmVhZC03NTgzYy5hcHBzcG90LmNvbS9vL3VzZXIlMkZraGFuZ2htMSUyRmF2YXRhci5wbmc_YWx0PW1lZGlhJnRva2VuPTYyZGEwOWEwLThhZjgtNDFkNy1hYmViLTZhMzM2NDQ1N2Y4MiIsInN0YXR1cyI6MCwiZW1haWwiOiJuMThkY2MueHh4LmFhenphenp6eiIsInJvbGUiOjF9LCJpYXQiOjE2NjAxNDk3NTMsImV4cCI6MTY5MTY4NTc1M30.wndws6Zf6y7mftxABo2sHN-5-4vfvBQ3wenr90wH9UA"
        // );
        setUser(response.data.data[0].user);
        console.log(response.data.data[0].user);

        sessionStorage.setItem("token", response.data.data[0].accessToken);
        console.log(user.username);
        if (response.data.data[0].user.role === 0 && response.data.data[0].user.status ===0 ) {
          navigate("/home");
         
        }
        else if(response.data.data[0].user.status !== 0){
            alert('Tài khoản đã bị khóa');
            setAccessToken('');
            setUser('');
            navigate('/login')
        } else {
          navigate("/admin");
        }
      } catch (error) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    };
    getToken();
  };
  const link = "/forgot-pasword";
  const linkRegister = "/signup";
  const [dataLogin, setDataLogin] = useState({});

  return (
    <div id="wrapper">
      <form action="" id="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 class="form-heading">Form đăng nhập</h1>
        <div class="form-group">
          <i class="far fa-user"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Tên đăng nhập"
            defaultValue=""
            {...register("username")}
          />
        </div>
        <div class="form-group">
          <i class="fas fa-key"></i>
          <input
            type="password"
            class="form-input"
            placeholder="Mật khẩu"
            defaultValue=""
            {...register("password")}
          />
          <div id="eye">
            <i class="far fa-eye"></i>
          </div>
        </div>
        <input
          type="submit"
          value="Đăng nhập"
          class="form-submit"
          onClick={handleSubmit}
        />
        <Link to={linkRegister}>
          <input
            type="submit"
            value="Đăng ký"
            class="form-submit"
            onClick={handleSubmit}
          />
        </Link>

        <Link to={link}>Quên mật khẩu?</Link>
      </form>
    </div>
  );
}

export default Form;
