# vue-json-schema-form
* 基于 `Vue`、`ElementUi`、`JSON Schema` 动态生成一个带完整校验的Form表单
* 支持通过 [可视化Schema编辑器](https://form.lljj.me/schema-generator.html "Vue JSON Schema Form 可视化编辑器") 快速生成表单对应Schema
* :star2: :star2: :star2: 你的 `star` 就是最大的支持
## 如何启动相关编辑器页面

1、 安装依赖
```ssh
yarn install
```

2、 同时运行 `Playground/表单Schema生成器/活动编辑器`
```ssh
# 可视化表单Schema编辑器 http://127.0.0.1:8800/schema-generator.html

yarn run demo:dev
```

### 说明
* 遵循 `JSON Schema` 规范，只需要给定 `JSON Schema`，即可生成对应的form表单
* 快速配置个性化ui视图和校验错误信息，可适配常用的ui库，目前的版本默认视图依赖 `elementUi`
* 表单schema校验使用  [ajv](https://github.com/epoberezkin/ajv)
* 设计思想和对schema解析索引参考 [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)

### 为何开发
毕业设计，导师要求开发已经基于动态表单的通用信息管理系统，基于vue-json-schema-form进行二次开发
## License
Apache-2.0
