# orcrist-ui

> 兽咬剑 JS 家族：React PC 端组件库

OrcristJS Family : React Web Components.

## 代码风格

**TypeScript**

## 组件列表

（待补充）

## 开发流程

```bash
$ npm install
$ npm start
```

### 进入开发

1. 创建独立开发分支：git checkout -b feat/xxComponent 分支
1. 在 **components** 目录下创建你的组件文件夹
1. 在 **components/index.ts** 文件中为组件进行 export
1. 在 **demo** 目录中添加你的演示路由
1. 开发并自测
1. commit & push

### 发布代码

1. 提 pr 至 master 分支
1. 发布 npm
1. push master

```bash
$ npm publish
$ git commit -m "feat: add XXX"
$ git push
```

### **Project** 中使用组件

```js
import { YourComponent } from 'orcrist-ui';
```

### 目录结构

```
├── AUTHORS.txt             作者(TODO)
├── CHANGELOG.xxx.md        变更记录文档(TODO)
├── LICENSE                 许可证(TODO
├── README.md               自述文档
├── ant-design-analysis     包分析(TODO)
├── components              组件代码
├── development.xxx.md      开发说明文档(TODO)
├── docs                    其他文档(TODO)
├── scripts                 辅助脚本(TODO)
├── tests                   通用测试代码(TODO)
├── tsconfig.json           TypeScript配置
├── typings                 第三方缺失定义
```
