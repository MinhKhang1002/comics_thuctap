import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
// import { loginApi } from "../../api/loginApi";
import Cookies from "js-cookie";
import { access_token } from "../../store/login";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { loginApi } from "../../api/loginApi";
// import { ErrorMessage } from "formik";
const ErrorMessage = ({ message }) => <p className="text-white">{message}</p>;

function Form(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const link = "/login";

  //   const [accessToken, setAccessToken] = useRecoilState(access_token);

  const onSubmit = (data) => {
    const getToken = async () => {
      try {
        console.log(data);
        const response = await loginApi.signUp(data);
        console.log(response);
        // setAccessToken(response.data.data[0].accessToken);
        // sessionStorage.setItem("token", response.data.data[0].accessToken);
        alert("Đăng ký thành công");
        navigate("/login");
      } catch (error) {
        alert("Đăng ký thất bại vui lòng thử lại");
      }
    };
    getToken();
  };
  //   const link = "/forgot-pasword";

  return (
    <div id="wrapper">
      <form action="" id="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 class="form-heading">Form đăng ký</h1>
        <div class="form-group">
          <i class="fa fa-envelope"></i>
          <input
            type="text"
            name="email"
            class="form-input"
            placeholder="Email"
            defaultValue=""
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid Email",
              },
            })}
          />
        </div>

        {Object.keys(errors).length !== 0 && (
          <ErrorMessage message="Vui lòng nhập đúng định dạng email @xxx.xxx"></ErrorMessage>
        )}

        <div class="form-group">
          <i class="fas fa-user"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Username"
            name="username"
            defaultValue=""
            {...register("username", { required: true })}
          />
        </div>
        {errors.username?.type === "required" && (
          <ErrorMessage message="Username không được trống"></ErrorMessage>
        )}
        <div class="form-group">
          <i class="fas fa-key"></i>
          <input
            type="password"
            class="form-input"
            name="password"
            placeholder="Password"
            defaultValue=""
            {...register("password", {
              required: true,
            })}
          />
          <div id="eye">
            <i class="far fa-eye"></i>
          </div>
        </div>
        {errors.username?.type === "required" && (
          <ErrorMessage message="Password không được trống"></ErrorMessage>
        )}

        <input
          type="submit"
          value="Đăng ký"
          class="form-submit"
          onClick={handleSubmit}
        />
        <Link to={link}>Quay về</Link>
      </form>
    </div>
  );
}

export default Form;
