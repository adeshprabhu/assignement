import React from "react";
import "./index.css";
import { Card } from "antd";
import { UserLIst } from "./userLIst";

export const Landing = () => {
  return (
    <div className="container">
      <div className="banner"></div>
      <Card>
        <div className="heading">Select an account</div>
        <UserLIst />
      </Card>
    </div>
  );
};
