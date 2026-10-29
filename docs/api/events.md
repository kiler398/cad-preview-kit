# 事件

所有事件通过 `viewer.eventBus` 派发，用法与 pdf.js 的 EventBus 相同：

```ts
const off = viewer.eventBus.on('layoutchanging', (e) => console.log(e.layout.name));
viewer.eventBus.on('documentloaded', fn, { once: true });
viewer.eventBus.off('layoutchanging', fn);
off();
```

| 事件 | 参数 | 说明 |
|---|---|---|
| `documentloaded` | `fileName, info: CadInfo` | 图纸已解析，第一个布局已显示 |
| `documentclosed` | | 打开新图纸或销毁前 |
| `layoutloaded` | `index, layout, truncated, unsupported` | 某个布局第一次生成图形。`unsupported` 是未显示的对象类型及数量 |
| `layoutchanging` | `index, layout, previous` | 切换布局 |
| `scalechanging` | `scale` | 缩放变化（像素 / 图形单位） |
| `viewchanged` | `center, scale, layout` | 平移或缩放后（每帧最多一次） |
| `layerschanged` | `layers: { name, visible }[]` | 图层显示状态变化 |
| `updatefindmatchescount` | `matchesCount: { current, total }` | 文字查找结果 |
| `cursormove` | `point: { x, y } \| null` | 光标对应的图形坐标，离开时为 `null` |
| `measure` | `result: MeasureResult` | 完成一次两点测量 |
| `toolchanged` | `tool: 'pan' \| 'measure'` | |
| `themechanged` | `theme` | |
| `error` | `error` | |

- **Vue**：每个事件以同名事件重新抛出，例如 `@layoutchanging`、`@measure`；另有 `@load`、`@error`、`@layoutChange`
- **React**：`onViewerEvent(name, evt)`，以及 `onMeasure`、`onScaleChanging`、`onLayersChange`、`onLoad`、`onError`、`onLayoutChange`
- **Web Component**：以 `cv-<name>` 派发 DOM 事件，例如 `cv-layoutchanging`；另有 `cv-load`、`cv-error`
