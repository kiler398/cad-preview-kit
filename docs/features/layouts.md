# 视图与布局

## 缩放与平移

| 操作 | 桌面 | 触屏 |
|---|---|---|
| 缩放 | 滚轮（以光标为中心）、`+` / `-`、工具栏按钮 | 双指捏合 |
| 平移 | 按住拖动、方向键、触控板双指滑动 | 单指拖动 |
| 全图显示 | 双击、`0` / `Home`、工具栏按钮 | 双击 |

全图显示（ZOOM E）会忽略零星的远离主体的对象（例如误放在 1e10 处的点），避免图纸缩成一个点。

```ts
viewer.zoomIn(); viewer.zoomOut(); viewer.fitView();
viewer.currentScale = 0.5;                                   // 像素 / 图形单位
viewer.zoomTo({ x: 39512390, y: 3382315 }, 2);               // 以绝对坐标为中心
viewer.zoomToBox(0, 0, 15000, 9000);                         // 显示一个矩形范围
viewer.getView();                                            // { center, scale }
viewer.clientToWorld(e.clientX, e.clientY);                  // 屏幕 → 图形坐标
```

## 布局

模型空间和每个图纸空间布局显示为底部标签，按图纸中的标签顺序排列。图纸空间以白纸灰底显示，视口按比例显示模型空间内容，视口冻结的图层在该视口中隐藏。

<ClientOnly><LayoutDemo /></ClientOnly>

```ts
viewer.layoutsCount;            // 布局数量（含模型）
viewer.currentLayout;           // 当前布局序号
await viewer.setLayout(2);      // 或按名称：setLayout('A3 打印')
viewer.eventBus.on('layoutchanging', ({ index, layout, previous }) => {});
new CadViewer(el, { initialLayout: 'A3 打印' });  // 打开后直接显示某个布局
```

每个布局在第一次切换时才生成图形，之后切换是即时的，并保留各自的缩放位置。
