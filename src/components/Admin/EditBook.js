import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";
import { comics } from "../../api/tmdbApi";
import { useRecoilState } from "recoil";
import { access_token } from "../../store/login";
function EditProduct({
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
  setValue("title", product !== undefined ? product.title : "");
  setValue("author", product !== undefined ? product.author : "");
  setValue("description", product !== undefined ? product.description : "");
  setValue("type", product !== undefined ? product.type : "");
  setValue("endpoint", product !== undefined ? product.endpoint : "");
  const onSubmit = (data) => {
    const { endpoint, title, thumb, author, description, type, genres } = data;
    console.log(endpoint, title, thumb, author, description, type);
    const formData = new FormData();
    formData.append("title", title);

    if (thumb.length === 0) {
      console.log(123123123);
    } else {
      formData.append("thumb", thumb[0]);
      formData.append("theme", thumb[0]);
    }
    // formData.append("thumb", thumb[0]);

    formData.append("author", author);
    formData.append("description", description);
    formData.append("type", type);

    const editBook = async () => {
      try {
        console.log(endpoint);
        const response = await comics.editBook(endpoint, formData, config);
        console.log(response);
        if (response.status === 200) {
          getProducts();
          setValue("endpoint", "");
          setValue("title", "");
          setValue("thumb", "");
          setValue("author", "");
          setValue("description", "");
          setValue("type", "");

          success();
        } else {
          error();
        }
      } catch {
        console.log("errrrrrrrrrrrrrr");
        console.log(data);
      }
    };
    editBook();
  };

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
      <h3>Hình ảnh:</h3>
      <div className="flex ">
        <img src={product.thumb} alt="" width="400"></img>

        <input
          className="input"
          type="file"
          multiple="multiple"
          {...register("thumb")}
        />
      </div>

      <div>
        <h3>Tác giả: </h3>
        <input
          className="input"
          placeholder="Tên truyện"
          {...register("author")}
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

      <div>
        <h3>Loại truyện:</h3>

        <select
          name="type"
          id="type"
          {...register("type", { required: true })}
          className="type"
        >
          <option value="Comic">Comic</option>
          <option value="Novel">Novel</option>
          <option value="Literature">Literature</option>
        </select>
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

export default EditProduct;
