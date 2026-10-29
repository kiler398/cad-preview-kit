# 图层

点击工具栏的图层按钮打开图层面板：显示每个图层的颜色和可见状态，可以按名称筛选，并对筛选结果批量显示或隐藏。初始状态与图纸一致：关闭或冻结的图层不显示。

<ClientOnly><LayerDemo /></ClientOnly>

```ts
viewer.getLayers();
// [{ name: '墙体', color: 0xffffff, fg: true, linetype: 'Continuous', on: true, frozen: false, locked: false, visible: true }, …]

viewer.setLayerVisible('填充', false);
viewer.setLayerVisible(['轴网', '标注'], true);
viewer.setAllLayersVisible(true);
viewer.resetLayers();                  // 恢复图纸中的开关状态
viewer.toggleLayerPanel(true);

viewer.eventBus.on('layerschanged', ({ layers }) => console.log(layers.filter((l) => l.visible).length));
```

图层可见性保存在 GPU 纹理中，开关图层不会重新生成图形，十万级实体的图纸也能即时响应。

块中位于 0 层的对象随块参照所在图层显示或隐藏，与 AutoCAD 的规则一致。
