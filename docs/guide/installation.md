# 安装与环境要求

```bash
npm i cad-preview-kit
# 或
pnpm add cad-preview-kit
yarn add cad-preview-kit
```

Vue 和 React 是可选的 peer 依赖，只在使用对应封装时需要。

## 包内容

| 入口 | 说明 |
|---|---|
| `cad-preview-kit` | 原生 JS 类 `CadViewer`、无头 API `openCad` / `inspectCad`、类型 |
| `cad-preview-kit/vue` | Vue 3 组件 `<CadViewer>` |
| `cad-preview-kit/react` | React 组件 `<CadViewer>` |
| `cad-preview-kit/element` | 注册 `<cad-viewer>` 自定义元素（副作用导入） |
| `dist/wasm/cpk_core_bg.wasm` | Rust 内核，约 3.4 MB（gzip 后约 1.2 MB），首次打开图纸时才加载 |
| `cad-preview-kit` 命令 | Node.js 命令行工具，见[无头 API 与命令行](/features/headless) |

## 浏览器要求

| 能力 | 要求 | 不满足时 |
|---|---|---|
| WebAssembly | Chrome 61+、Safari 11+、Firefox 60+、Edge 79+ | 无法使用 |
| WebGL2 | 绝大多数桌面和手机浏览器 | 自动回退 Canvas 2D 渲染（大图纸较慢） |
| Module Worker | Chrome 80+、Safari 15+、Firefox 114+ | 自动在主线程解析 |

Node.js 18 及以上可以使用无头 API 和命令行。

## 预加载

WASM 内核在第一次打开图纸时加载。如果希望更快，可以在用户进入页面时预先编译：

```ts
import { preloadCadCore } from 'cad-preview-kit';
preloadCadCore(); // 只下载并编译，不占用 Worker
```
