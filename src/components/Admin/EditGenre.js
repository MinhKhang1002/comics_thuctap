import React from "react";
import { useForm } from "react-hook-form";
import { message, Button, Space } from "antd";
import { comics } from "../../api/tmdbApi";
import { useRecoilState } from "recoil";
import { access_token } from "../../store/login";
function EditGenre({
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
    const { endpoint, title, description } = data;

    const editGenre = async () => {
      try {
        console.log(endpoint);
        const response = await comics.editGenre(
          endpoint,
          { title, description },
          config
        );
        console.log(response);
        if (response.status === 200) {
          getProducts();
          setValue("endpoint", "");
          setValue("title", "");
          setValue("description", "");

          success();
        } else {
          error();
        }
      } catch {
        console.log("errrrrrrrrrrrrrr");
      }
    };
    editGenre();
  };
  setValue("endpoint", product !== undefined ? product.endpoint : "");
  setValue("title", product !== undefined ? product.title : "");
  setValue("description", product !== undefined ? product.description : "");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>Mã sản phẩm:</h3>
        <input
          className="input"
          placeholder="Tên truyện"
          {...register("endpoint")}
          readOnly
        />
      </div>

      <div>
        <h3>Tên sản phẩm:</h3>
        <input
          className="input"
          placeholder="Tên truyện"
          {...register("title")}
        />
      </div>

      <div>
        <h3>Mô tả truyện:</h3>
        <input
          className="input"
          placeholder="Mô tả"
          {...register("description")}
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

export default EditGenre;
