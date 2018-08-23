import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Loadable from "react-loadable";
import RouterList from "./router_list";
import Util from "../utils/util";

Util.checkOpenId();

const loading = ({ error, pastDelay }) => {
  if (error) {
    return <div>error</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh"
      }}
    >
      加载中……
    </div>
  );
};

const getRoutePath = path => path.split("/:")[0];

const getCustomView = path => {
  return Loadable({
    loader: () => import("../views" + path),
    loading
  });
};

const RouteList = [];

for (let key in RouterList) {
  const item = RouterList[key];
  if (typeof item === "object") {
    for (let jKey in item) {
      const jItem = item[jKey];
      RouteList.push(
        <Route
          key={key + "_" + jKey}
          path={jItem}
          component={getCustomView(getRoutePath(jItem))}
        />
      );
    }
  } else {
    RouteList.push(
      <Route
        key={key}
        path={item}
        component={getCustomView(getRoutePath(item))}
      />
    );
  }
}

const Layout = () => (
  <Router basename="/mobile/">
    <div>
      <Switch>
        {RouteList}
        <Redirect from="/" to={RouterList.navigation} />
      </Switch>
    </div>
  </Router>
);

export default Layout;
