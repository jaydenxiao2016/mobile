import { Toast } from "antd-mobile";

import Util from "../utils/util";
import CONSTANT from "../utils/constant";

// const prefix = 'http://xiaoyuan.myuclass.com'; // 智慧校园测试环境

const prefix = "/";

// eslint-disable-next-line
const mock_openId = "oh7ng0bfXdJUzdngj_fmPIM0BWhM";
// eslint-disable-next-line
const mock_userId = 2155027;

let fetchCounter = 0;

const service = {
  get: (url, { autoJWT = true, autoLoadingStatus = true } = {}) => {
    if (!url.includes("logout")) {
      fetchCounter++;
    }
    if (autoLoadingStatus === true && fetchCounter === 1) {
      Toast.loading(CONSTANT.loadingMessage, 0);
    }
    let tempUrl = url;
    const _jwt = Util.storage.get(CONSTANT.STORAGE_KEY_JWT);
    if (_jwt && autoJWT === true) {
      tempUrl = url.includes("?")
        ? `${url}&_jwt=${_jwt}`
        : `${url}?_jwt=${_jwt}`;
    }
    return fetch(tempUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    }).then(res => {
      setTimeout(() => {
        fetchCounter--;
        if (fetchCounter === 0) {
          Toast.hide();
        }
      }, 100);
      if (url.includes("logout")) return Promise.resolve(true); // 特殊fetch特殊处理
      if (res.ok) return res.json();
      else return Promise.reject(res["statusText"]);
    });
  },
  post: (url, { data = {}, autoJWT = true } = {}) => {
    // const _jwt = Util.storage.get(CONSTANT.STORAGE_KEY_JWT);
    // if (_jwt && autoJWT === true) {
    //   data['_jwt'] = _jwt;
    // }
    return fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: Util.paramsToSearch(data)
    }).then(res => {
      if (res.ok) return res.json();
      else return Promise.reject(res["statusText"]);
    });
  },
  getOpenId: () => {
    const localOpenId = Util.storage.get(CONSTANT.STORAGE_KEY_OPENID);
    if (localOpenId) {
      return Promise.resolve(localOpenId);
    } else {
      return service
        .get(
          Util.pathJoin(
            prefix,
            `business/openId?code=${Util.parseExtra("code")}`
          ),
          { autoJWT: false }
        )
        .then(res => {
          const openId = res["openId"];
          Util.storage.put(CONSTANT.STORAGE_KEY_OPENID, openId);
          return Promise.resolve(openId);
        });
    }
  }
};

export default service;
