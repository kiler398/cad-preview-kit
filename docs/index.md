---
layout: home

hero:
  name: cad-preview-kit
  text: DWG / DXF 在线预览组件
  tagline: Rust + WebAssembly 解析 · WebGL2 渲染 · 纯前端 · Vue 3 / React / Web Component 通用
  image:
    src: /images/mobile.png
    alt: 移动端预览效果
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick-start
    - theme: alt
      text: 在线演示
      link: /playground
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/cad-preview-kit

features:
  - icon: 📐
    title: DWG 与 DXF 全版本
    details: DWG R13 – 2018+、DXF R12 – 2018+（ASCII / 二进制）。按文件内容识别格式，不看扩展名。
  - icon: ⚡
    title: 纯前端，无需转换服务
    details: Rust 内核编译为 WebAssembly，在 Web Worker 中解析和细分；WebGL2 绘制，十万级实体的图纸也能流畅缩放平移。
  - icon: 🧱
    title: 块实例化与样式继承
    details: 块定义只细分一次，插入时按变换矩阵展开；ByLayer / ByBlock 颜色、线型和 0 层继承规则与 AutoCAD 一致。
  - icon: 🗂️
    title: 布局、视口与图层
    details: 模型 / 图纸空间切换，视口按比例显示模型并支持视口冻结图层；图层面板可筛选、批量开关。
  - icon: 📏
    title: 测量、查找、导出
    details: 两点测量带对象捕捉，文字查找带高亮定位，导出 PNG、矢量 SVG，DWG 一键转 DXF。
  - icon: 🤖
    title: 无头 API 与命令行
    details: 在 Node.js 中读取图层 / 布局 / 实体统计、提取文字、转 SVG 或 DXF，方便接入 Agent / MCP 工具链。
---

<div class="vp-doc" style="max-width: 1152px; margin: 48px auto 0; padding: 0 24px;">

## 试一试

下面的预览器直接安装自 npm 上发布的 `cad-preview-kit`。切换示例图纸，或者打开你自己的 DWG / DXF 试试（文件只在浏览器本地处理，不会上传）：

<ClientOnly><BasicDemo /></ClientOnly>

```bash
npm i cad-preview-kit
```

> 组件源码不公开，npm 上发布的成品**可以免费商用**，详见[许可协议](/license)。

</div>
