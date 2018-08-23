import React from "react";
import { Link } from "react-router-dom";

import RouterList from "../routes/router_list";
import CONSTANT from "../utils/constant";
import Util from "../utils/util";

const data = [];

for (let key in RouterList) {
  const item = RouterList[key];
  if (typeof item === "object") {
    for (let jKey in item) {
      const jItem = item[jKey];
      data.push({ path: jItem, title: key + "_" + jKey });
    }
  } else {
    data.push({ path: item, title: key });
  }
}

const LinkList = data.map(item => (
  <div key={item.path} style={{ margin: "3vw", fontSize: "5vw" }}>
    <Link style={{ textDecoration: "underline" }} to={item.path}>
      {item.title}
    </Link>
  </div>
));

const navigation = props => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        minHeight: "100vh",
        backgroundColor: "#8b8"
      }}
    >
      <div className="login-info">
        {Util.storage.get(CONSTANT.LOGIN.STATUS) ===
        CONSTANT.LOGIN.IS_LOGGED ? (
          <div>
            已登录 <button onClick={Util.logout}>退出</button>
          </div>
        ) : (
          <button onClick={Util.login}>登录</button>
        )}
      </div>
      {LinkList}
    </div>
  );
};

export default navigation;
