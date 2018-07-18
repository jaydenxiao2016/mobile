import React from "react";
import { Link } from "react-router-dom";
import RouterList from "../routes/router_list";

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
      {LinkList}
    </div>
  );
};

export default navigation;
