import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Toast } from "antd-mobile";

import Loadable from "react-loadable";
import RouterList from "./router_list";
import CONSTANT from "../utils/constant";
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

const WhiteList = [RouterList.navigation, RouterList.todo];

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isAuthorized =
        WhiteList.includes(rest.path) ||
        Util.storage.get(CONSTANT.LOGIN.STATUS) === CONSTANT.LOGIN.IS_LOGGED;
      // 需要登录的页面添加提示信息
      if (!WhiteList.includes(rest.path) && !isAuthorized)
        Toast.info("需要登录哦，亲！");
      return isAuthorized ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: RouterList.navigation,
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

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
        <PrivateRoute
          key={key + "_" + jKey}
          path={jItem}
          component={getCustomView(getRoutePath(jItem))}
        />
      );
    }
  } else {
    RouteList.push(
      <PrivateRoute
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
