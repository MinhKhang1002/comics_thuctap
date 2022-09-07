import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message, Button, Space } from "antd";

function AddCustomer({ getCustomers }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const success = () => {
    message.success("Thêm thành công");
  };
  const error = () => {
    message.error("Thêm thất bại");
  };

  const onSubmit = (data) => {
    const { avatar, fullName, address, phoneNumber, email } = data;
    const formDataUploadFile = new FormData();
    formDataUploadFile.append("file", avatar[0]);
    const postImages = async () => {
      try {
        const responseUploadFile = await axios.post(
          "http://localhost:8080/api/cloudDinary/fileUpload",
          formDataUploadFile
        );
        if (responseUploadFile.status === 200) {
          console.log(responseUploadFile.data.message);
          const responseInsertCustomers = await axios.post(
            "http://localhost:8080/api/customers",
            {
              fullName: fullName,
              status: 1,
              address: address,
              phoneNumber: phoneNumber,
              email: email,
              avatar: responseUploadFile.data.message,
            }
          );
          setValue("fullName", "");
          setValue("address", "");
          setValue("email", "");
          setValue("phoneNumber", "");
          setValue("avatar", "");
          getCustomers();
          success();
        } else {
          error();
        }
      } catch (e) {
        message.error("Số điện thoại bị trùng !");
      }
    };
    postImages();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <h3 className="text-[16px]">Tên khách hàng:</h3>
          <input
            className="border-2 w-10/12 ml-4 px-4 py-1 rounded"
            placeholder="Tên nhân viên"
            {...register("fullName", { required: true })}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Địa chỉ:</h3>
          <input
            className="border-2 w-10/12 ml-20 px-4 py-1 rounded"
            placeholder="Địa chỉ"
            {...register("address", { required: true })}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">SĐT :</h3>
          <input
            className="border-2 w-10/12 ml-24 px-4 py-1 rounded"
            placeholder="Số điện thoại"
            {...register("phoneNumber", { required: true })}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Email:</h3>
          <input
            className="border-2 w-10/12 ml-[90px] px-4 py-1 rounded"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="flex items-center mt-4">
          <h3 className="text-[16px]">Hình ảnh:</h3>
          <input
            className="border-2 w-10/12 ml-[60px] px-4 py-1 rounded"
            type="file"
            {...register("avatar", { required: true })}
          />
        </div>

        <button className="mt-4 bg-blue-500 px-4 py-2 rounded text-white mb-4">
          Thêm Khách Hàng
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
