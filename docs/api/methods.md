# 实例方法

Vue 通过模板 ref 调用（`viewerRef.value.setLayout(1)`），React 的 ref 就是实例（`ref.current?.setLayout(1)`），Web Component 通过 `el.viewer` 调用。

## 打开与销毁

| 方法 | 说明 |
|---|---|
| `open(src, fileName?)` | 打开图纸，返回 `Promise<LoadedInfo \| null>` |
| `setOptions(patch)` | 修改选项 |
| `destroy()` | 销毁实例、释放 GPU 和 WASM 资源 |
| `info` | 当前图纸的 `CadInfo` |

## 视图

| 方法 / 属性 | 说明 |
|---|---|
| `zoomIn()` / `zoomOut()` | 缩放 1.5 倍 |
| `fitView()` | 全图显示（`fitWidth()` 为兼容 office-preview-kit 的别名） |
| `currentScale` | 读写：像素 / 图形单位 |
| `zoomTo(point, scale?)` | 以绝对坐标为中心 |
| `zoomToBox(minX, minY, maxX, maxY)` | 显示矩形范围 |
| `getView()` | `{ center, scale }` |
| `clientToWorld(x, y)` / `worldToClient(p)` | 屏幕与图形坐标互转 |
| `toggleFullscreen()` | 全屏（不支持时用页面内全屏） |
| `setTheme(t)` / `toggleTheme()` / `currentTheme` | 背景主题 |

## 布局与图层

| 方法 / 属性 | 说明 |
|---|---|
| `layoutsCount` / `currentLayout` | 布局数量、当前序号（可写） |
| `setLayout(indexOrName)` | 切换布局 |
| `getLayers()` | 图层列表及当前可见性 |
| `setLayerVisible(name \| names, visible)` | 显示 / 隐藏图层 |
| `setAllLayersVisible(visible)` | |
| `resetLayers()` | 恢复图纸中的状态 |
| `toggleLayerPanel(open?)` | 打开 / 关闭图层面板 |

## 测量与查找

| 方法 | 说明 |
|---|---|
| `setTool('measure' \| 'pan')` / `currentTool` | 测量工具 |
| `search(query)` | 查找文字，返回匹配数量 |
| `findNext()` / `findPrev()` | |

## 导出

| 方法 | 说明 |
|---|---|
| `renderToImage(opts?)` / `renderToCanvas(opts?)` / `downloadImage(opts?)` | PNG / JPEG，见[导出](/features/export) |
| `exportSvg(opts?)` / `downloadSvg(name?)` | SVG |
| `exportDxf()` / `downloadDxf(name?)` | DXF |
| `download()` | 下载原文件 |
| `setWatermark(w)` | 设置 / 清除水印 |
