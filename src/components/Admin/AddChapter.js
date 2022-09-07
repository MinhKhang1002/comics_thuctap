import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";
import { comics } from "../../api/tmdbApi";
import { useRecoilState } from "recoil";

import { access_token, username } from "../../store/login";

function AddGenre({ products, setProducts, endpoint, getChapter }) {
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

  setValue("chapter_endpoint", endpoint);
  const onSubmit = (data) => {
    const { title, images } = data;
    const formData = new FormData();
    formData.append("title", title);
    for (var i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    // formData.append("images", images);
    const addGenre = async () => {
      try {
        const response = await comics.addChapter(endpoint, formData, config);
        console.log(response);
        if (response.status === 200) {
          setValue("title", "");
          getChapter();
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
        <h3>Book_endpoint:</h3>
        <input
          className="input"
          placeholder="Book Endpoint"
          {...register("chapter_endpoint", { required: true })}
          readOnly
        />
      </div>

      <div>
        <h3>Title:</h3>
        <input className="input" placeholder="Mô tả" {...register("title")} />
      </div>
      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Hình ảnh:</h3>
        <input
          className="input"
          type="file"
          multiple="multiple"
          {...register("images", { required: true })}
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
