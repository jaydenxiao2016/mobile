# mobile

## 环境

![node>=8.9.0](https://img.shields.io/badge/node-%3E%3D8.9.0-green.svg)

## 安装依赖

```bash
yarn
# or
npm install
```

## 运行

- 开发

```bash
yarn start
# or
npm run start
```

- 生产
- **打包之前记得修改`/package.json`中的版本号**

```bash
yarn build
# or
npm run build
```

## 功能模块

- [x] TODO
- [x] “用户”机制

## 技术栈

- ES6
- React
- antd-mobile
- Less
- Flex
- Fetch
- Promise
- Webpack
- ……

## 相关数据

- 原型

```base

```

- UI 时间

```bash

```

- 接口时间

```bash

```

- 相关人员

```bash

```

- 环境

```bash

```

- 公众号

```bash

```

- FTP 服务

```bash

```

## 二三事

- `antd-mobile@2.x` 不在依赖 `moment`,可以减少 `50+KB` 的体积，但是需要自行实现`时间格式化`功能
- 路由拦截器
- `video` iOS 下播放问题，使用 `source` 解决
- `Fetch` 参数长度过长可以使用 `FormData` 格式参数传参
- 全面屏适背景图适配问题，背景图底边不要出现图案，用图片或纯色填充
- 由于后台（部分 Java 框架）不支持 `/router/:p1/:p2`，页面间传递参数 由 `/router/:p1/:p2` 改为 `/router?p1=v1&p2=v2`
- 在公众号中使用需要配置 `/src/utils/constant.js` 中的 `APPID` 项的值
