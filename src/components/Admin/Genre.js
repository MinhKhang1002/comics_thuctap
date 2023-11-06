import React, { useEffect, useState } from "react";
// import AddProduct from "./AddProduct";
import { Table, Button, Popconfirm, message } from "antd";
import { useRecoilState } from "recoil";
import { productState } from "../../store/login";
// import EditProduct from "./EditProduct";
import { comics } from "../../api/tmdbApi";
import AddGenre from "./AddGenre";
import EditGenre from "./EditGenre";

import { access_token } from "../../store/login";

function Genre(props) {
  const [items, setItems] = useRecoilState(productState);
  const [product, setProduct] = useState();
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [page, setPage] = useState(1);

  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [keyword, setKeyword] = useState("");
  console.log(keyword);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getProducts = async () => {
    let response;
    try {
      response = await comics.getAllGenre();
      setItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (text, record) => {
    const deleteProducts = async () => {
      try {
        await comics.deleteGenre(record.endpoint, config);

        getProducts();
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

  const handleEdit = (text, record) => {
    setToggleEdit(true);
    setProduct(record);
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const columns = [
    {
      title: "Endpoint",
      dataIndex: "endpoint",
      key: "endpoint",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <h3 style={{ color: "blue" }}>{text}</h3>,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
    {
      title: "Edit",
      key: "edit",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(text, record)}>
          <i class="fa-solid fa-pen-to-square"></i>
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h3 class="title">Genre</h3>
      <Table
        columns={columns}
        dataSource={items?.map((product) => {
          return product;
        })}
      ></Table>
      <Button type="primary" className="mb-10" onClick={handleToggleAdd}>
        Thêm thể loại
      </Button>
      {toggleAdd === true && (
        <AddGenre
          products={items}
          setProducts={items}
          getAllGenre={getProducts}
        ></AddGenre>
      )}
      {toggleEdit === true && (
        <EditGenre
          products={items}
          setProducts={product}
          product={product}
          getProducts={getProducts}
          setToggleEdit={setToggleEdit}
        ></EditGenre>
      )}
    </div>
  );
}

export default Genre;
