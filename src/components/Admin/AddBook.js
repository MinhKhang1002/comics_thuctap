import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";
import { comics } from "../../api/tmdbApi";
import { useRecoilState } from "recoil";

import { access_token, username } from "../../store/login";
import { useEffect,useState } from "react";

function AddBook({ products, setProducts }) {
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [filter,setFilter] = useState([]);
  const [genres, setGenres] = useState('');

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

  useEffect(() =>{
    const getListGenre = async () =>{
      let response ;
      response = await comics.getAllGenre();
      setFilter(response.data.data);
    }
    getListGenre();
  })

  const onSubmit = (data) => {
    const { title, thumb, author, description, type, genres } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumb", thumb[0]);
    formData.append("theme", thumb[0]);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("genres",genres)
    // formData.append("genres",genres);
    const addBook = async () => {
      try {
        const response = await comics.addBook(formData, config);
        if (response.status === 200) {
          setValue("title", "");
          setValue("thumb", "");
          setValue("inventory", "");
          setValue("author", "");
          setValue("description", "");
          setValue("type", "");
          success();
        } else {
          error();
        }
      } catch {
        console.log("errrrrrrrrrrrrrr");
      }
    };
    addBook();
  };

  const handleChange = (e) => {
    setGenres(e.target.value);
    console.log(e.target.value);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3>Tên sản phẩm:</h3>
        <input
          className="input"
          placeholder="Tên truyện"
          {...register("title", { required: true })}
        />
      </div>

      <div className="flex items-center mt-4">
        <h3 className="text-[16px]">Hình ảnh:</h3>
        <input
          className="input"
          type="file"
          multiple="multiple"
          {...register("thumb", { required: true })}
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
          onChange={handleChange}
          {...register("type", { required: true })}
          className="type"
          
        >
          <option value="Comic">Comic</option>
          <option value="Novel">Novel</option>
          <option value="Literature">Literature</option>
        </select>
      </div>
      

      <div>
        <h3>Loại truyện:</h3>

        <select
          name="type"
          id="type"
          {...register("genres")}
          className="type"
        >
          {filter.map((item,i) =>(
            <option value = {item.endpoint} key={i}>
              {item.title}
            </option>
          ))}
        </select>
      
      </div>

      <input
        type="submit"
        value="Thêm sách"
        class="form-submit"
        onClick={handleSubmit}
      />
    </form>
  );
}

export default AddBook;
