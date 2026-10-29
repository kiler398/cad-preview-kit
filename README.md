<h1 align="center">cad-preview-kit</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/cad-preview-kit"><img src="https://img.shields.io/npm/v/cad-preview-kit.svg" alt="npm version"></a>
  <a href="https://kiler398.github.io/cad-preview-kit/"><img src="https://img.shields.io/badge/docs-%E6%96%87%E6%A1%A3-1f6f8b.svg" alt="docs"></a>
  <img src="https://img.shields.io/badge/license-freeware%20%C2%B7%20commercial%20use%20free-40865c.svg" alt="license">
</p>

<p align="center">
  <b>中文</b> · <a href="#english">English</a>
</p>

![cad-preview-kit](https://raw.githubusercontent.com/kiler398/cad-preview-kit/main/docs/public/images/desktop.png)

## 简介

**cad-preview-kit** 是纯前端、只读的 **DWG / DXF 在线预览组件**。图纸由 **Rust + WebAssembly** 内核在浏览器中解析和细分，用 **WebGL2** 渲染，不需要 CAD 软件，也不需要服务端转换。支持 **Vue 3**、**React**、**Web Component** 和原生 JS，界面风格与 [office-preview-kit](https://www.npmjs.com/package/office-preview-kit) 一致。

- 📖 **文档与在线演示**：<https://kiler398.github.io/cad-preview-kit/>
- 📦 **npm**：<https://www.npmjs.com/package/cad-preview-kit>

### 特性

- **DWG R13 – 2018+、DXF R12 – 2018+**（ASCII 和二进制），按文件内容识别格式
- **纯前端**：WASM 内核在 Web Worker 中运行，大图纸不卡界面；WebGL2 渲染，无 WebGL 时自动回退 Canvas 2D
- **完整的二维显示**：直线、圆弧、椭圆、样条、多段线（凸度和线宽）、填充（实体、图案、渐变）、文字、多行文字、属性、标注、引线、多重引线、表格、多线、点样式、构造线、射线、块参照（含阵列插入）
- **线型**：按 LTSCALE 和对象线型比例绘制虚线、点划线
- **布局**：模型空间和图纸空间切换；视口按比例显示模型，支持视口冻结图层
- **图层面板**：显示或隐藏图层，可筛选，初始状态与图纸中的开关和冻结一致
- **测量**：两点距离、Δx/Δy、角度，对象捕捉（端点、中点、圆心、象限点、插入点）
- **文字查找**：高亮匹配项并定位
- **导出**：PNG、SVG（矢量）、DXF（DWG 转 DXF）
- **大坐标精度**：以场景原点为基准的相对坐标，测绘坐标（如 3.9×10⁷）不抖动
- **无头 API 和命令行**：在 Node.js 中读取图纸信息、提取文字、转 SVG 或 DXF，可接入 Agent 或 MCP 工具

### 安装

```bash
npm i cad-preview-kit
```

### 快速开始

```vue
<!-- Vue 3 -->
<script setup>
import { CadViewer } from 'cad-preview-kit/vue';
</script>

<template>
  <div style="height: 80vh">
    <CadViewer src="/files/平面图.dwg" @layoutchanging="(e) => console.log(e.layout.name)" />
  </div>
</template>
```

```tsx
// React
import { CadViewer } from 'cad-preview-kit/react';

<CadViewer src={file} style={{ height: '80vh' }} />;
```

```html
<!-- Web Component -->
<script type="module">import 'cad-preview-kit/element';</script>
<cad-viewer src="/files/part.dxf" theme="light" style="height:600px"></cad-viewer>
```

```ts
// 原生 JS
import { CadViewer } from 'cad-preview-kit';
const v = new CadViewer(document.getElementById('box')!, { theme: 'dark' });
await v.open(file);                       // URL / File / Blob / ArrayBuffer / Uint8Array
await v.setLayout('A3 打印');               // 切换布局
v.setLayerVisible(['填充', '轴网'], false);  // 图层
await v.search('卧室');                     // 文字查找
const svg = v.exportSvg();                  // 导出
```

### 常用选项

| 选项 | 默认值 | 说明 |
|---|---|---|
| `theme` | `'dark'` | 模型空间背景：`'dark'` 或 `'light'` |
| `locale` | `'zh-CN'` | `'zh-CN'` 或 `'en'` |
| `worker` | `true` | 在 Web Worker 中解析 |
| `renderer` | `'auto'` | `'canvas2d'` 强制使用 2D 渲染 |
| `fontFamily` | 微软雅黑 / 苹方 / Noto Sans CJK… | 绘制文字使用的字体（浏览器无法加载 SHX 字体） |
| `initialLayout` | `0` | 初始布局（序号或名称） |
| `maxVertices` | `12 000 000` | 每个布局的顶点上限，超出后截断几何，文字仍显示 |
| `wasmUrl` | 包内 `dist/wasm/cpk_core_bg.wasm` | 自托管或 CDN 地址 |
| `watermark` | – | 文字水印，屏幕和导出图片中都会显示 |
| `toolbar` / `download` / `fullscreen` / `layers` / `measure` | `true` | 显示或隐藏界面元素 |

完整的选项、事件、方法见[文档站](https://kiler398.github.io/cad-preview-kit/)。

### Node.js / 命令行

```bash
npx cad-preview-kit info  plan.dwg            # 版本、单位、图层、布局、实体统计
npx cad-preview-kit text  plan.dwg --json     # 全部文字及坐标
npx cad-preview-kit svg   plan.dwg -l 1       # 导出布局 1 为 SVG
npx cad-preview-kit dxf   plan.dwg            # DWG → DXF
```

```ts
import { openCad } from 'cad-preview-kit';
const doc = await openCad(bytes);
console.log(doc.info.layers, await doc.texts());
```

### 已知限制

- SHX 字体无法在浏览器中加载，文字用系统字体绘制，字宽与 AutoCAD 略有差异
- 光栅图像、外部参照、PDF/DWF 参考底图只显示边框或不显示；三维实体和面域只显示可解析的线框
- 不支持编辑；如需编辑请使用专业 CAD 软件

### 许可协议

免费商用，源码不公开。详见 [LICENSE](LICENSE) 和 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。DWG/DXF 读取使用 MPL-2.0 许可的 [acadrust](https://github.com/hakanaktt/acadrust)（未修改）。本组件不包含 GPL 代码。

---

<a id="english"></a>

## English

**cad-preview-kit** is a read-only, browser-only **DWG / DXF viewer**. Drawings are parsed and tessellated by a **Rust + WebAssembly** core and rendered with **WebGL2**; no CAD software or server-side conversion is needed. Works with **Vue 3**, **React**, **Web Components** and vanilla JS, with the same UI style as [office-preview-kit](https://www.npmjs.com/package/office-preview-kit).

### Features

- **DWG R13 – 2018+, DXF R12 – 2018+** (ASCII and binary), detected by content
- **Client-side only**: the WASM core runs in a Web Worker; WebGL2 rendering with an automatic Canvas 2D fallback
- **2D entity coverage**: lines, arcs, ellipses, splines, polylines (bulges and widths), hatches (solid, pattern, gradient), TEXT / MTEXT / ATTRIB, dimensions, leaders, multileaders, tables, multilines, point styles, XLINE / RAY, block references (including MINSERT arrays)
- **Linetypes** with LTSCALE and per-object scale
- **Layouts**: model and paper space; viewports show model space at scale, with per-viewport frozen layers
- **Layer panel**: toggle and filter layers; initial state follows the file's on/off and frozen flags
- **Measure**: distance, Δx/Δy and angle with object snaps (endpoint, midpoint, centre, quadrant, insertion point)
- **Text search** with highlight and zoom-to
- **Export**: PNG, SVG (vector), DXF (DWG → DXF)
- **Survey-grade coordinates**: geometry is stored relative to a scene origin, so coordinates around 10⁷ don't jitter
- **Headless API and CLI** for Node.js: document info, text extraction, SVG and DXF conversion, ready to wrap as agent or MCP tools

### Install

```bash
npm i cad-preview-kit
```

### Usage

```ts
import { CadViewer } from 'cad-preview-kit';            // vanilla
import { CadViewer } from 'cad-preview-kit/vue';        // Vue 3 component
import { CadViewer } from 'cad-preview-kit/react';      // React component
import 'cad-preview-kit/element';                       // <cad-viewer> custom element

const v = new CadViewer(container, { theme: 'light', locale: 'en' });
await v.open('/files/plan.dwg');
v.eventBus.on('measure', ({ result }) => console.log(result.distance, result.unit));
```

Bundlers: the WASM file is referenced with `new URL('cpk_core_bg.wasm', import.meta.url)` and is emitted as an asset by Vite, webpack 5 and Rollup. With the Vite dev server, add `optimizeDeps: { exclude: ['cad-preview-kit'] }`. The parser worker is created from a `blob:` URL; if your CSP forbids that, pass `worker: false` or allow `worker-src blob:`.

### Limitations

- SHX fonts can't be loaded in a browser; text is drawn with system fonts, so glyph widths differ slightly from AutoCAD
- Raster images, xrefs and PDF/DWF underlays show at most a frame; 3D solids and regions show only the wireframe that can be decoded
- Viewing only, no editing

### License

Free for commercial use, source code not published. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). DWG/DXF reading uses the MPL-2.0 licensed [acadrust](https://github.com/hakanaktt/acadrust), unmodified. The package contains no GPL code.
