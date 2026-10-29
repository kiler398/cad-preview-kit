# 快速开始

预览器会撑满父元素，**请给父元素设置高度**。

## Vue 3

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CadViewer } from 'cad-preview-kit/vue';

const viewer = ref<InstanceType<typeof CadViewer>>();
const onLoad = (e) => console.log(e.info.layers);
</script>

<template>
  <div style="height: 100vh">
    <CadViewer ref="viewer" src="/files/平面图.dwg" theme="dark" @load="onLoad" @measure="(e) => console.log(e.result)" />
  </div>
</template>
```

`src` 可以是 URL、`File`、`Blob`、`ArrayBuffer` 或 `Uint8Array`。如果 `src` 没有文件名（如 Blob），传入 `file-name` 用于标题和下载。

## React

```tsx
import { useRef } from 'react';
import { CadViewer, type CadViewerRef } from 'cad-preview-kit/react';

export default function Page({ file }: { file: File }) {
  const ref = useRef<CadViewerRef>(null);
  return (
    <div style={{ height: '100vh' }}>
      <CadViewer ref={ref} src={file} onLoad={(i) => console.log(i.info)} onMeasure={(r) => console.log(r.distance)} />
    </div>
  );
}
// ref.current 就是 CadViewer 实例：ref.current?.setLayout(1)、ref.current?.exportSvg() ……
```

## Web Component / 原生 HTML

```html
<script type="module">
  import 'cad-preview-kit/element';
  const el = document.querySelector('cad-viewer');
  el.addEventListener('cv-load', (e) => console.log(e.detail));
  el.addEventListener('cv-measure', (e) => console.log(e.detail.result));
</script>

<cad-viewer src="/files/part.dxf" theme="light" locale="zh-CN" style="display:block;height:600px"></cad-viewer>
```

属性：`src`、`file-name`、`locale`、`title-text`、`theme`、`toolbar="false"`、`download="false"`。其余选项通过 `el.options = {...}` 设置；实例在 `el.viewer`。

## 原生 JS

```ts
import { CadViewer } from 'cad-preview-kit';

const v = new CadViewer(document.getElementById('box')!, { locale: 'zh-CN', theme: 'dark' });
const loaded = await v.open('/files/plan.dwg');
console.log(loaded?.info.layouts);

v.eventBus.on('layoutchanging', ({ layout }) => console.log('当前布局', layout.name));
await v.setLayout('A3 打印');
```

## 在上传组件中使用

```ts
input.onchange = () => {
  const f = input.files?.[0];
  if (f) viewer.open(f); // 文件只在浏览器本地解析，不会上传
};
```
