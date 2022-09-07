import React, { useEffect, useState } from "react";
// import AddProduct from "./AddProduct";
import { Table, Button, Popconfirm, message } from "antd";
import { useRecoilState } from "recoil";
import { endpointBook, productState } from "../../store/login";
// import EditProduct from "./EditProduct";
import { comics } from "../../api/tmdbApi";
import AddChapter from "./AddChapter";

import { access_token } from "../../store/login";

function Genre(props) {
  const [items, setItems] = useRecoilState(productState);
  const [product, setProduct] = useState();
  const [toggleAdd, setToggleAdd] = useState(false);

  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [endpoint, setEndpoint] = useRecoilState(endpointBook);
  const [keyword, setKeyword] = useState(endpoint);
  console.log(keyword);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getChapter = async () => {
    let response;
    console.log(endpoint);
    try {
      if (keyword === "") {
        response = await comics.getChapter(endpoint);
      } else {
        response = await comics.getChapter(keyword);
      }

      setItems(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChapter();
  }, [keyword, endpoint]);

  const handleDelete = (text, record) => {
    const deleteProducts = async () => {
      try {
        console.log(record);
        const response = await comics.deleteChapter(
          endpoint,
          record.chapter_endpoint,
          config
        );
        console.log(response);
        getChapter();
      } catch (e) {
        console.log("saiiiiiiiiiiii");
      }
    };

    deleteProducts();
  };

  const confirm = (text, record) => {
    handleDelete(text, record);
    message.success("Xóa thành công");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Hủy xóa");
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const columns = [
    {
      title: "Chapter",
      dataIndex: "chapter_endpoint",
      key: "chapter_endpoint",
    },
    {
      title: "Book",
      dataIndex: "book_endpoint",
      key: "book_endpoint",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <h3 style={{ color: "blue" }}>{text}</h3>,
    },

    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "Delete",
      key: "delete",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Bạn có chắc chắn xóa không?"
          onConfirm={() => confirm(text, record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">
            <i class="fa-solid fa-trash-can"></i>
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <h3 class="title">Chapter</h3>
      <div className="search">
        <input
          type="text"
          onBlur={(e) => setKeyword(e.target.value)}
          className=""
        ></input>
        <h3>Search</h3>
      </div>
      {items && (
        <Table
          columns={columns}
          dataSource={items.map((product) => {
            return product;
          })}
        ></Table>
      )}

      <Button type="primary" className="mb-10" onClick={handleToggleAdd}>
        Add Chapter
      </Button>
      {toggleAdd === true && (
        <AddChapter
          getChapter={getChapter}
          products={items}
          endpoint={keyword}
          setProducts={items}
        ></AddChapter>
      )}
    </div>
  );
}

export default Genre;
