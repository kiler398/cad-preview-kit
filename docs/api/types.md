# TypeScript 类型

所有类型都从包入口导出：

```ts
import type { CadViewerOptions, CadInfo, CadLayer, CadLayout, CadFont, LoadedInfo, CadEventMap, MeasureResult, CadPoint, WatermarkOptions, Scene } from 'cad-preview-kit';
```

```ts
interface CadInfo {
  format: 'DWG' | 'DXF';
  version: string;        // 'AC1032'
  release: string;        // '2018'
  units: number;          // $INSUNITS
  unitName: string;       // 'mm'
  layers: CadLayer[];
  fonts: CadFont[];
  linetypes: string[];
  layouts: CadLayout[];
  blocks: number;         // 命名块定义数量
  entities: number;       // 数据库中的实体数量（含块定义内部）
  counts: Record<string, number>;
  warnings: string[];
}

interface CadLayer { name: string; color: number; fg?: boolean; linetype: string; on: boolean; frozen: boolean; locked: boolean }
interface CadLayout { name: string; model: boolean; tab: number; limits?: [number, number, number, number] }

interface MeasureResult {
  start: CadPoint; end: CadPoint;
  distance: number; dx: number; dy: number;
  angle: number;          // 度，逆时针，0 为 +X
  unit: string;
}

class ViewerError extends Error {
  code: 'fetch-failed' | 'unsupported' | 'parse-failed' | 'render-failed' | 'webgl-unavailable';
}
```

## 二进制场景

`openCad(...).scene(i)` 返回内核输出的场景，可以用于自定义渲染（例如 three.js、Canvas、服务端出图）：

```ts
interface Scene {
  meta: { origin: [number, number]; bounds; fit; paper; texts: SceneText[]; viewports: SceneViewport[]; truncated; unsupported; warnings };
  linePos: Float32Array;   // 线段端点 x,y（相对 origin），每两个点一条线段
  lineCol: Uint8Array;     // 每个顶点 RGBA；A = 0 表示前景色（ACI 7）
  lineLayer: Uint16Array;  // 每个顶点的图层序号（对应 info.layers）
  triPos / triCol / triLayer;  // 三角形（填充）
  ptPos / ptCol / ptLayer;     // 点
}
```
