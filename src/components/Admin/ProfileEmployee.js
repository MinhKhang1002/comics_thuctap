import React from "react";
import { profileEmployeeState, username } from "../../store/login";
import { useRecoilState } from "recoil";

function ProfileEmployee(props) {
  const [user, setUser] = useRecoilState(username);
  console.log(user);

  return (
    <div className="">
      <div>
        <div>
          <h3 className="mr-8"> Hình ảnh:</h3>
          <img src={user.avatar} width="150px"></img>
        </div>
        <h3 className="flex text-[18px] mb-4">{`Username: ${user.username}`}</h3>
        <h3 className="flex text-[18px] mb-4">{`Email: ${user.email}`}</h3>
        <h3 className="flex text-[18px] mb-4">{`Status: ${
          user.status === 0 ? "Kích hoạt" : "Bị khóa"
        }`}</h3>
        <h3 className="flex text-[18px] mb-4">{`Role: Quản trị viên`}</h3>
        {/* <h3 className="flex text-[18px] mb-4">{`Số điện thoại: ${user.phoneNumber}`}</h3> */}
      </div>
    </div>
  );
}

export default ProfileEmployee;
