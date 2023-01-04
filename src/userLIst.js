import { Avatar, List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserLIst = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const getUserList = async () => {
    const { data } = await axios.get("https://panorbit.in/api/users.json");
    setDataSource(data.users);
  };
  const onUserSelect = (val) => {
    localStorage.setItem("user", JSON.stringify(val));
    navigate("/userDetail");
  };
  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div>
      {dataSource.length > 0 && (
        <List
          dataSource={dataSource}
          className={"list-card-list"}
          id="narrow-scrollbar"
          renderItem={(val) => (
            <List.Item
              key={val.id}
              onClick={onUserSelect.bind(this, val)}
              className={"chat-list-item"}
            >
              <List.Item.Meta
                avatar={<Avatar src={val.profilepicture} size={"large"} />}
                title={val.name}
                className={"w100"}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
