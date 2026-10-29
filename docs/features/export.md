# 导出 PNG / SVG / DXF

<ClientOnly><ExportDemo /></ClientOnly>

## PNG

```ts
// 当前视图，2 倍像素
const blob = await viewer.renderToImage();

// 全图，指定尺寸和背景色
const blob2 = await viewer.renderToImage({ extents: true, width: 2400, height: 1600, scale: 1, background: '#ffffff' });

// 直接下载
await viewer.downloadImage({ extents: true, type: 'image/jpeg', quality: 0.9 });

// 拿到 canvas 自己处理
const canvas = viewer.renderToCanvas({ extents: true, width: 800, height: 600 });
```

| 选项 | 说明 |
|---|---|
| `extents` | `true` 导出全图（模型空间范围或整张图纸），否则导出当前视图 |
| `width` / `height` | 输出尺寸（CSS 像素），默认等于预览区域 |
| `scale` | 像素倍率，默认 `max(2, devicePixelRatio)` |
| `background` | 背景色；浅色背景会自动把白色对象换成黑色 |
| `type` / `quality` | 图片格式和质量 |
| `watermark` | 覆盖实例的水印设置，`null` 不加水印 |

## SVG（矢量）

```ts
const svg = viewer.exportSvg();                      // 当前布局，当前图层可见性
viewer.exportSvg({ layers: 'all', background: null }); // 所有图层、透明背景
viewer.downloadSvg('平面图.svg');
```

SVG 按图层分组（`<g data-layer="墙体">`），线条使用 `vector-effect: non-scaling-stroke`，缩放不变粗。图纸空间布局中的视口用 `clipPath` 裁剪。

## DXF

```ts
const blob = await viewer.exportDxf();   // ASCII DXF
await viewer.downloadDxf();              // DWG → DXF 转换
```

DXF 由 WASM 内核重新编码，版本与原图纸一致（例如 2004 版 DWG 导出为 2004 版 DXF），可以在不支持 DWG 的软件中继续使用。
