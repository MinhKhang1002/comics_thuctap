import React from "react";
import { useForm } from "react-hook-form";
import { message, Button, Space } from "antd";
import { comics } from "../../api/tmdbApi";
import { useRecoilState } from "recoil";
import { access_token } from "../../store/login";
import { loginApi } from "../../api/loginApi";
function EditCustomer({
  product,
  products,
  setProducts,
  getProducts,
  setToggleEdit,
}) {
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const success = () => {
    message.success("Sửa thành công");
  };
  const error = () => {
    message.error("Sửa thất bại");
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { avatar, email } = data;

    const editUser = async () => {
      const formData = new FormData();
      formData.append("avatar", avatar[0]);
      formData.append("email", email);
      console.log(formData);
      try {
        const response = await loginApi.edit(formData, config);
        console.log(response);
        // setProducts(response.data.data[0]);
        alert("Cập nhật thành công");
      } catch (error) {
        alert("Vui lòng kiểm tra lại");
      }
    };
    editUser();
  };
  setValue("username", product !== undefined ? product.username : "");
  setValue("email", product !== undefined ? product.email : "");
  setValue("avatar", product !== undefined ? product.avatar : "");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>Username:</h3>
        <input
          className="input"
          placeholder="Tên truyện"
          {...register("username")}
          readOnly
        />
      </div>

      <div>
        <h3>Email:</h3>
        <input
          className="input"
          placeholder="Tên truyện"
          {...register("email")}
        />
      </div>

      <h3>Hình ảnh:</h3>
      <div className="flex ">
        <img src={product.avatar} width="100" alt=""></img>

        <input
          className="input"
          type="file"
          multiple="multiple"
          {...register("avatar")}
        />
      </div>

      <input
        type="submit"
        value="Cập nhật thông tin"
        class="form-submit"
        onClick={handleSubmit}
      />
    </form>
  );
}

export default EditCustomer;
