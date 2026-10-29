# 介绍

**cad-preview-kit** 是一个纯前端、只读的 DWG / DXF 在线预览组件。图纸在浏览器中解析、细分和渲染，不需要安装 CAD 软件，也不需要服务端转换。

![桌面端效果](/images/desktop.png)

## 工作原理

```text
DWG / DXF 字节
   │  Web Worker
   ▼
Rust 内核（WebAssembly）
   ├─ 读取：acadrust（DWG R13–2018、DXF R12–2018）
   ├─ 块缓存：每个块定义只细分一次，插入时按矩阵实例化
   ├─ 样式解析：ByLayer / ByBlock 颜色和线型、0 层继承、透明度
   ├─ 细分：圆弧、椭圆、NURBS 样条、凸度多段线、宽多段线
   ├─ 填充：偶奇规则三角化、图案线生成、渐变色
   └─ 输出：二进制场景（线段 / 三角形 / 点 + 文字项 + 视口）
   │  Transferable，零拷贝
   ▼
TypeScript 外壳
   ├─ WebGL2 渲染（图层可见性存在纹理里，开关图层不重新上传几何）
   ├─ Canvas 2D 文字层（按实际字体测量排版，小字自动简化）
   └─ 工具栏 / 图层面板 / 布局标签 / 测量 / 查找 / 导出
```

坐标按场景原点存为相对值，测绘坐标（如 X=39 512 300）也不会出现浮点抖动。

## 适用场景

- 网盘、OA、项目管理系统中的图纸预览
- 招投标、审图、施工现场在手机上快速查看图纸
- AI Agent 生成或处理图纸后的结果展示（配合[无头 API](/features/headless)）

## 与 office-preview-kit 的关系

两个组件的界面风格、API 风格（`eventBus`、Vue / React / Web Component 封装、`setOptions`、水印……）和发布方式一致，可以在同一个项目中一起使用：Office / PDF 文件交给 [office-preview-kit](https://www.npmjs.com/package/office-preview-kit)，DWG / DXF 交给本组件。
