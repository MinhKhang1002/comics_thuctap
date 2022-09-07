import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { loginApi } from "../../api/loginApi";
import Cookies from "js-cookie";
import { access_token } from "../../store/login";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { loginApi } from "../../api/loginApi";

function Form(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useRecoilState(access_token);

  const onSubmit = (data) => {
    const getToken = async () => {
      try {
        // const response = await loginApi.getToken(data);

        // setAccessToken(response.data.data[0].accessToken);
        // sessionStorage.setItem("token", response.data.data[0].accessToken);
        // navigate("/home");
        // // console.log(response);
        console.log(data.email);
      } catch (error) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
      }
    };
    getToken();
  };

  const [dataLogin, setDataLogin] = useState({});

  return (
    <div id="wrapper">
      <form action="" id="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 class="form-heading">Quên mật khẩu</h1>
        <div class="form-group">
          <i class="far fa-user"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Nhập Email"
            defaultValue=""
            {...register("email")}
          />
        </div>

        <input
          type="submit"
          value="Gửi Mail Xác Thực"
          class="form-submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Form;
