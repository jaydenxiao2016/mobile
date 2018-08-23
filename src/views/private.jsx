import React, { Component } from "react";

import Util from "../utils/util";

class CustomView extends Component {
  render() {
    return (
      <div>
        我是需要登录才能看到的
        <button onClick={() => Util.logout()}>退出</button>
      </div>
    );
  }
}

export default CustomView;
