# 网易云音乐

## 项目简介

网易云音乐是模仿官网搭建的一个单页面应用程序，主要包括推荐页面的搭建，以及音乐播放和用户逻辑交互设计。主要分为多级菜单导航栏模块、入住歌手、热门主播、热门推荐模块、新碟上架、榜单、音乐播放的模块。

## 代码仓库

- GitHub: github.com/Nalamal/react_music

## 技术栈

React18、ant-design、axios、 redux 和 react-router 等。

## 项目功能

- 导航栏模块:搭建导航栏，实现二级菜单实现页面跳转。
- 轮播图模块:轮播展示新专辑和热门歌曲信息。
- 推荐模块:展示热门推荐歌单卡片、入住歌手列表、热门主播列表、新碟上架卡片、榜单列表等模块。
- 音乐播放模块:点击榜单中的音乐，播放音乐，实现循环列表、顺序列表、单曲循环、上一曲/下一曲播放、歌词展示等功能。

## 文件资源结构

```text
vue_shop
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件
├─ src
│  ├─ assets              # 静态资源文件
│  ├─ base-ui             # 基础UI文件
│  ├─ components          # 全局组件
│  ├─ router              # 路由配置文件
│  ├─ service             # axios 配置文件
│  ├─ store               # pinia 状态管理仓库
│  ├─ utils               # 封装工具库
│  ├─ views               # 项目页面文件
│  ├─ App.tsx             # 项目主组件
│  ├─ index.tsx           # 项目入口文件
│  ├─ react-app-env.d.ts  # 声明文件
├─ .env.development       # 开发环境环境变量
├─ .env.production        # 生产环境环境变量
├─ .eslintrc.js           # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierrignore       # Prettier 格式化忽略文件
├─ .prettierrc            # Prettier 格式化配置文件
├─ craco.config.js        # webpack 配置文件
├─ package-lock.json      # 依赖包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
```

## 常用命令

- clone

```sh
# github
https://github.com/Nalamal/react_music.git
```

- install

```sh
npm install
```

- run

```sh
npm run start
```

- build

```sh
npm run build
```

- format

```sh
npm run prettier
```

## 项目总体预览

![总体预览](https://img1.imgtp.com/2023/07/11/Mb0iI5Lk.jpg)
