import React, { useCallback, useEffect, useState } from "react";
import AddBook from "./AddBook";
import { Table, Button, Popconfirm, message } from "antd";
import { useRecoilState } from "recoil";
import { productState } from "../../store/login";
import EditBook from "./EditBook";
import { comicsAPI } from "../../api/axiosClient";
import { comics } from "../../api/tmdbApi";
import Chapter from "./Chapter";
import { tabState, key, endpointBook } from "../../store/login";

import { access_token } from "../../store/login";

function Products(props) {
  const [items, setItems] = useRecoilState(productState);
  const [product, setProduct] = useState();
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleAddChapter, setTonggleAddChapter] = useState(false);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useRecoilState(tabState);
  const [endpoint, setEndpoint] = useRecoilState(endpointBook);

  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [keyword, setKeyword] = useState("");
  console.log(keyword);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getProducts = async () => {
    let response;
    try {
      if (keyword === "") {
        response = await comics.getAllBook(page);
      } else {
        const params = { title: keyword };
        response = await comics.search(params);
      }

      setItems(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [keyword]);

  const loadMore = async () => {
    let response = null;

    const params = {
      page: page + 1,
    };
    try {
      response = await comics.getAllBook(page);
    } catch {
      console.log("error");
    }
    setItems([...items, ...response.data.data]);
    console.log(response.data.data[0]);
    setPage(page + 1);
  };

  const handleDelete = (text, record) => {
    const deleteProducts = async () => {
      try {
        const response = await comics.deleteBook(record.endpoint, config);

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

  const handleAddChapter = (text, record) => {
    setEndpoint(record.endpoint);
    setTab(3);
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
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Thumb",
      dataIndex: "thumb",
      key: "thumb",
      render: (text) => <img src={text} width="100" alt="" />,
    },
    {
      title: "Add Chapter",
      key: "addchapter",
      fixed: "addchapter",
      width: 100,
      render: (text, record) => (
        <Button onClick={() => handleAddChapter(text, record)}>
          <i class="text-xl  fa-solid fa-book"></i>
        </Button>
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
      <h3 class="title">Book</h3>
      <div className="search">
        <input
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
          className=""
        ></input>
        <h3>Search</h3>
      </div>

      <Table
        columns={columns}
        dataSource={items.map((product) => {
          return product;
        })}
      ></Table>
      <Button type="primary" className="mb-10 btn-right" onClick={loadMore}>
        Load more
      </Button>

      <Button type="primary" className="mb-10" onClick={handleToggleAdd}>
        Thêm sản phẩm
      </Button>
      {toggleAdd === true && (
        <AddBook products={items} setProducts={items}></AddBook>
      )}
      {toggleEdit === true && (
        <EditBook
          products={items}
          setProducts={product}
          product={product}
          getProducts={getProducts}
          setToggleEdit={setToggleEdit}
        ></EditBook>
      )}
    </div>
  );
}

export default Products;
