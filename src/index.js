import React from "react";
import ReactDOM from "react-dom";
import Router from "./routes/index";

import "./assets/stylesheets/_reset.css";
import "./assets/stylesheets/main.less";
import "./assets/stylesheets/custom_antd.less";

ReactDOM.render(<Router />, document.getElementById("root"));
