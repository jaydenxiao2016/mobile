import { Toast } from "antd-mobile";

import CONSTANT from "./constant";
import Service from "../server/service";

const getCodeUrl = () => {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
    CONSTANT.APPID
  }&redirect_uri=${encodeURIComponent(
    window.location.href
  )}&response_type=code&scope=snsapi_base&#wechat_redirect`;
};

/**
 * 检测 openId
 */
const checkOpenId = () => {
  const openId = util.getOpenId(),
    code = util.parseExtra("code");
  if (code) Service.setOpenId(code);
  else if (!openId) getCodeUrl();
};

/**
 * 工具类
 */
const util = {
  /**
   * 路径拼接，支持多个参数
   * @param args str1, str2, ...
   */
  pathJoin: (...args) => {
    let arr = [].slice.call(args),
      len = arr.length,
      path = "";
    for (let i = 0; i < len; i++) {
      if (!arr[i]) continue;
      arr[i] = arr[i].replace(/^\//, "").replace(/\/$/, "");
      path += arr[i] + "/";
    }
    return path.slice(0, path.length - 1);
  },
  // 解析location.href
  parseExtra: key => {
    const str = decodeURIComponent(document.location.href);
    const reg = new RegExp(key + "=(\\w+)", "i");
    let result = reg.exec(str);
    if (!result)
      result = new RegExp(key + "=([\u4e00-\u9fa5\\w]+)", "i").exec(str);
    result && (result = result[1]);
    return result;
  },
  /**
   * 设置页面标题
   * @param {string} title
   */
  setTitle: title => {
    document.title = title;
  },
  /**
   * 对象转为 search 模式 {id:222, name: '二胖'} => id=222&name=二胖
   * @param params
   * @returns {string|string}
   */
  paramsToSearch: params => {
    let result = "";
    for (let key in params) {
      params[key] &&
        params[key] !== "invalid_values" &&
        (result += `${key}=${params[key]}&`);
    }
    return result && result.slice(0, result.length - 1);
  },
  /**
   * 统一错误提示
   * @param errorMsg
   */
  handleError: (errorMsg = "服务异常，请稍后重试") => {
    Toast.info(errorMsg, 2);
  },
  /**
   * localStorage简单封装
   */
  storage: {
    put: (key, value) => {
      if (!key) {
        console.error("storage.put", "非法参数");
        return false;
      }
      let tempStr = localStorage.getItem(CONSTANT.STORAGE_KEY),
        tempObj = {};
      if (tempStr) {
        tempObj = JSON.parse(tempStr);
      }
      tempObj[key] = value;
      localStorage.setItem(CONSTANT.STORAGE_KEY, JSON.stringify(tempObj));
    },
    get: key => {
      const tempStr = localStorage.getItem(CONSTANT.STORAGE_KEY);
      if (!tempStr) {
        return tempStr;
      }
      const tempObj = JSON.parse(tempStr);
      return tempObj[key];
    },
    remove: key => {
      const tempStr = localStorage.getItem(CONSTANT.STORAGE_KEY);
      if (!tempStr) {
        return tempStr;
      }
      const tempObj = JSON.parse(tempStr);
      if (tempObj[key]) {
        delete tempObj[key];
      }
      return localStorage.setItem(
        CONSTANT.STORAGE_KEY,
        JSON.stringify(tempObj)
      );
    },
    clear: () => {
      localStorage.clear();
    }
  },
  /**
   * 验证的简单封装
   */
  verify: {
    isPhone: phone => {
      if (phone) {
        if (phone.length !== 11 || !/^1[35789]\d{9}/.test(phone)) {
          return "手机号码格式不正确";
        }
      } else {
        return "手机号码不可以为空";
      }
    }
  },
  isIPhone: new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
    window.navigator.userAgent
  ),
  getRealyOffsetTop: selector => {
    let el = document.querySelector(selector),
      parentNode = el && el.offsetParent;
    if (!el) return 0;
    let num = el.offsetTop;
    while (parentNode.nodeName.toLocaleUpperCase() !== "BODY") {
      el = parentNode;
      parentNode = el.offsetParent;
      num += el.offsetTop;
    }
    return num;
  },
  /**
   * 判断是否为微信客户端
   */
  isWeixin: () => {
    return window.navigator.userAgent
      .toLocaleUpperCase()
      .includes("MICROMESSENGER");
  },
  /**
   * 获取随机字符串（10-32位）
   */
  getNonceStr: (minLen = 10, maxLen = 32) => {
    let nonceStr = "";
    const arr = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      randomLen = Math.round(Math.random() * (maxLen - minLen)) + minLen;
    for (let i = 0; i < randomLen; i++) {
      const randomPos = Math.round(Math.random() * (arr.length - 1));
      nonceStr += arr[randomPos];
    }
    return nonceStr;
  },

  /**
   * 微信公众号唯一标识 openId
   */
  getOpenId: () => {
    if (util.isWeixin()) {
      return util.storage.get(CONSTANT.STORAGE_KEY_OPENID);
    } else {
      let openId = util.storage.get(CONSTANT.STORAGE_KEY_OPENID);
      if (openId) return openId;
      else {
        openId = util.getNonceStr(22, 22);
        util.storage.put(CONSTANT.STORAGE_KEY_OPENID, openId);
        return openId;
      }
    }
  },
  checkOpenId
};

export default util;
