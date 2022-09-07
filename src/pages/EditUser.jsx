import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { access_token, username } from "../../src/store/login";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../src/api/loginApi";
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
  console.log(user?.role);
  const onSubmit = (data) => {
    const { avatar, email } = data;

    const editUser = async () => {
      const formData = new FormData();
      formData.append("avatar", avatar[0]);
      formData.append("email", email);
      console.log(formData);
      try {
        const response = await loginApi.edit(formData, config);
        setUser(response.data.data[0]);
        message.success('Cập nhật thành công')
      } catch (error) {
        alert("Vui lòng kiểm tra lại");
      }
    };
    editUser();
  };
  const link = "/change-password";

  return (
    <div id="wrapper">
      <form action="" id="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 class="form-heading">Sửa thông tin</h1>

        <img
          src={user.avatar}
          alt=""
          style={{ borderRadius: 10, width: 300, marginLeft: 20 }}
          width="100"
        />
        <div class="form-group">
          <i class="far fa-image"></i>
          <input type="file" class="form-input" {...register("avatar")} />
        </div>

        <div class="form-group">
          <i class="far fa-user"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Username"
            defaultValue={user.username}
            {...register("username")}
            readOnly
          />
        </div>
        <div class="form-group">
          <i class="fas fa-envelope"></i>
          <input
            type="text"
            class="form-input"
            placeholder="Email"
            defaultValue={user.email}
            {...register("email")}
          />
        </div>
        <Link to={link}>Đổi mật khẩu?</Link>

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
