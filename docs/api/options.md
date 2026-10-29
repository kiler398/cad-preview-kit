# 属性与选项

## 组件属性

| Vue / React 属性 | Web Component 属性 | 类型 | 说明 |
|---|---|---|---|
| `src` | `src` / `el.source` | `string \| URL \| File \| Blob \| ArrayBuffer \| Uint8Array` | 要打开的图纸 |
| `fileName` / `file-name` | `file-name` | `string` | 文件名（标题、下载） |
| `locale` | `locale` | `'zh-CN' \| 'en'` | 界面语言 |
| `title` | `title-text` | `string` | 顶栏标题，默认是文件名 |
| `theme` | `theme` | `'dark' \| 'light'` | 模型空间背景 |
| `toolbar` | `toolbar="false"` | `boolean` | 显示顶栏 |
| `download` | `download="false"` | `boolean` | 显示下载按钮 |
| `fullscreen` | – | `boolean` | 显示全屏按钮 |
| `options` | `el.options` | `CadViewerOptions` | 其余选项 |

## CadViewerOptions

| 选项 | 默认值 | 说明 |
|---|---|---|
| `fileName` | 从 File / URL 推断 | |
| `locale` | `'zh-CN'` | |
| `title` | 文件名 | |
| `theme` | `'dark'` | |
| `background` | – | 自定义模型空间背景色（CSS 颜色），优先于 `theme` |
| `accentColor` | `#1f6f8b` | 顶栏颜色 |
| `toolbar` / `download` / `fullscreen` / `layers` / `measure` | `true` | 显示对应界面元素 |
| `coordinates` | `true` | 左下角显示光标坐标 |
| `fetchInit` | – | `src` 为 URL 时传给 `fetch` 的参数（headers、credentials） |
| `worker` | `true` | 在 Web Worker 中解析，失败时自动回退主线程 |
| `renderer` | `'auto'` | `'canvas2d'` 强制使用 Canvas 2D 渲染 |
| `wasmUrl` | 包内文件 | 自托管 WASM 的地址 |
| `maxVertices` | `12000000` | 每个布局的顶点上限。超出后几何被截断（文字仍然显示），并提示“图纸过大” |
| `fontFamily` | 见[字体](/guide/theming#字体) | 绘制文字的 CSS 字体 |
| `initialLayout` | `0` | 初始布局：序号或名称 |
| `watermark` | – | `string` 或 `{ text, color, fontSize, angle, gapX, gapY }` |
| `onLoad` | – | `(info: LoadedInfo) => void` |
| `onError` | – | `(err: ViewerError) => void` |
| `onLayoutChange` | – | `(index: number, layout: CadLayout) => void` |

`setOptions(patch)` 可以在运行时修改选项（不会重新打开图纸）。
