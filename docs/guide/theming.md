# 外观、字体与国际化

## 背景主题

模型空间默认使用 CAD 常见的深色背景，可切换为浅色：

```ts
new CadViewer(el, { theme: 'light' });
viewer.setTheme('dark');
viewer.toggleTheme();           // 工具栏上的“切换背景”按钮
new CadViewer(el, { background: '#0b1e2d' }); // 自定义背景色（优先于 theme）
```

ACI 7 号颜色（白 / 黑）随背景切换；与背景过于接近的颜色自动换成前景色；浅色背景上的亮黄、亮绿等颜色会自动加深。图纸空间始终是白纸灰底。

## 工具栏颜色与按钮

```ts
new CadViewer(el, {
  accentColor: '#6b4fbb',   // 顶栏颜色
  toolbar: true,            // false 隐藏整个顶栏
  download: false,          // 隐藏下载按钮
  fullscreen: true,
  layers: true,             // 图层按钮
  measure: true,            // 测量按钮
  coordinates: true,        // 左下角坐标
});
```

窄屏（宽度小于 560 px）时自动隐藏缩放和背景按钮，只保留常用按钮；支持双指缩放和双击全图。

## 字体

浏览器无法使用 SHX 字体。文字绘制规则：

1. 文字样式中设置了 TrueType 字体（如“宋体”“Arial”）时优先使用
2. 否则使用 `fontFamily`，默认 `"Microsoft YaHei","PingFang SC","Hiragino Sans GB","Noto Sans CJK SC","Source Han Sans SC","WenQuanYi Micro Hei",Arial,Helvetica,sans-serif`

需要统一字体（例如仿宋风格的施工图）时：

```ts
new CadViewer(el, { fontFamily: '"FangSong","STFangsong",serif' });
```

## 国际化

```ts
new CadViewer(el, { locale: 'en' });      // 'zh-CN'（默认）或 'en'
viewer.setOptions({ locale: 'zh-CN' });
```

## 水印

```ts
new CadViewer(el, { watermark: '内部资料 严禁外传' });
viewer.setWatermark({ text: '张三 2026-10-28', color: 'rgba(255,0,0,.12)', fontSize: 20, angle: -30 });
viewer.setWatermark(null);
```

水印同时绘制在屏幕和导出的 PNG 中。
