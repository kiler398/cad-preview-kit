# 无头 API 与命令行

不挂载预览器也能使用内核：在浏览器中做上传校验、在 Node.js 中提取文字建索引、批量转 SVG 缩略图，或者包装成 Agent / MCP 工具。

## 无头 API

```ts
import { openCad, inspectCad } from 'cad-preview-kit';

const info = await inspectCad(fileOrBytes);
// { format: 'DWG', version: 'AC1032', release: '2018', unitName: 'mm', layers: [...], layouts: [...], counts: { LINE: 120, … } }

const doc = await openCad(fileOrBytes);
const texts = await doc.texts();               // [{ text, x, y, layer }]（含块中的文字和属性）
const svg = await doc.toSvg({ layout: 0, theme: 'light' });
const dxf = await doc.toDxf();                 // Uint8Array
const scene = await doc.scene(0);              // 二进制场景（线段 / 三角形 / 文字），可自行渲染
doc.close();
```

在 Node.js 中 WASM 从包内文件读取，不需要网络。

## 命令行

```bash
npx cad-preview-kit info  plan.dwg             # 版本、单位、布局、图层、实体统计
npx cad-preview-kit info  plan.dwg --json      # JSON 输出
npx cad-preview-kit text  plan.dwg --json      # 所有文字及坐标、图层
npx cad-preview-kit svg   plan.dwg -l "A3 打印" -o out.svg
npx cad-preview-kit svg   plan.dwg --dark      # 深色背景
npx cad-preview-kit dxf   plan.dwg -o plan.dxf # DWG → DXF
```

```text
file      建筑平面图.dwg
format    DWG AC1032 (AutoCAD 2018)
units     mm
layouts   0:Model  1:A3 打印
layers    12  (1 off/frozen)
blocks    6
entities  202  LINE 37, LWPOLYLINE 29, INSERT 28, TEXT 28, HATCH 24, POINT 21, CIRCLE 13, MTEXT 8, DIMENSION 7, …
```

## 接入 Agent

命令行输出稳定、可解析（`--json`），可以直接作为 Agent 的工具使用，也可以用几行代码包装成 MCP 服务：`info` 用于判断图纸内容，`text` 用于检索图纸中的文字，`svg` 用于生成可在网页或聊天中展示的结果。
