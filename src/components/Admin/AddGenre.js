import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";
import { comics } from "../../api/tmdbApi";
import { useRecoilState } from "recoil";

import { access_token, username } from "../../store/login";

function AddGenre({ products, setProducts, getAllGenre }) {
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const success = () => {
    message.success("Thêm thành công");
  };
  const error = () => {
    message.error("Thêm thất bại");
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { title, description } = data;
    const addGenre = async () => {
      try {
        const response = await comics.addGenre({ title, description }, config);
        if (response.status === 200) {
          setValue("title", "");
          setValue("description", "");
          getAllGenre();
          success();
        } else {
          error();
        }
      } catch {
        console.log("errrrrrrrrrrrrrr");
      }
    };
    addGenre();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>Tên thể loại:</h3>
        <input
          className="input"
          placeholder="Tên thể loại"
          {...register("title", { required: true })}
        />
      </div>

      <div>
        <h3>Mô tả thể loại:</h3>
        <input
          className="input"
          placeholder="Mô tả"
          {...register("description")}
        />
      </div>

      <input
        type="submit"
        value="Thêm thể loại"
        class="form-submit"
        onClick={handleSubmit}
      />
    </form>
  );
}

export default AddGenre;
