# 测量与文字查找

<ClientOnly><MeasureDemo /></ClientOnly>

## 测量

点击工具栏的测量按钮（或 `viewer.setTool('measure')`），在图中依次点击两点。光标靠近端点、中点、圆心、象限点、多段线顶点或块插入点时自动捕捉（青色方框）。结果显示距离、Δx、Δy 和角度，单位取自图纸的 `$INSUNITS`。`Esc` 清除当前测量，再按一次退出测量。

```ts
viewer.setTool('measure');
viewer.eventBus.on('measure', ({ result }) => {
  // { start, end, distance, dx, dy, angle, unit }
  console.log(`${result.distance.toFixed(2)} ${result.unit}`);
});
viewer.setTool('pan');
```

在图纸空间布局中测量的是图纸尺寸（打印尺寸），不是模型尺寸。

## 文字查找

点击工具栏的查找按钮或按 `Ctrl / ⌘ + F`。匹配的文字高亮显示，当前项为橙色，并自动缩放到合适大小。`Enter` 下一个，`Shift + Enter` 上一个。查找范围包括块中的文字和属性，不包括隐藏图层上的文字。

```ts
const n = await viewer.search('卧室');   // 返回匹配数量并定位到第一个
viewer.findNext();
viewer.findPrev();
viewer.eventBus.on('updatefindmatchescount', ({ matchesCount }) => console.log(matchesCount)); // { current, total }
```

## 坐标显示

鼠标在图中移动时左下角显示绝对坐标；也可以监听：

```ts
viewer.eventBus.on('cursormove', ({ point }) => point && console.log(point.x, point.y));
```
