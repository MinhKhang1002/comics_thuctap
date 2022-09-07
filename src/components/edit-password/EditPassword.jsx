import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { access_token, username } from "../../store/login";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/loginApi";
import { message } from "antd";

function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [user, setUser] = useRecoilState(username);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const onSubmit = (data) => {
    const editPassword = async () => {
      console.log(data);
      try {
        if (data.password === data.repassword) {
          await loginApi.changePassword(data, config);
          message.success('Cập nhật thành công')
        } else {
          alert("Vui lòng xem lại re password");
        }
      } catch (error) {
        alert("Saiiiiiiii ");
      }
    };
    editPassword();
  };
  const link = "/edit";

  return (
    <div id="wrapper">
      <form action="" id="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 class="form-heading">Đổi mật khẩu</h1>

        <div class="form-group">
          <i class="far fa-key"></i>
          <input
            type="password"
            class="form-input"
            placeholder="Password"
            {...register("password")}
          />
          <div id="eye">
            <i class="far fa-eye"></i>
          </div>
        </div>
        <div class="form-group">
          <i class="fas fa-key"></i>
          <input
            type="password"
            class="form-input"
            placeholder="Re password"
            {...register("repassword")}
          />
          <div id="eye">
            <i class="far fa-eye"></i>
          </div>
        </div>
        <Link to={link}>Cập nhật thông tin</Link>

        <input
          type="submit"
          value="Cập nhật thông tin"
          class="form-submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Form;
