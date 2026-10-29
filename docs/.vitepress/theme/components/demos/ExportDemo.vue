<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import DemoViewer from '../DemoViewer.vue';

const demo = ref<InstanceType<typeof DemoViewer>>();
const preview = ref<{ url: string; title: string } | null>(null);
const busy = ref('');

function show(blob: Blob, title: string) {
  if (preview.value) URL.revokeObjectURL(preview.value.url);
  preview.value = { url: URL.createObjectURL(blob), title };
}
async function png(extents: boolean) {
  const v = demo.value?.viewer;
  if (!v) return;
  busy.value = '渲染中…';
  const t0 = performance.now();
  const blob = await v.renderToImage({ extents, width: 1600, height: 1000, scale: 1, background: '#ffffff' });
  busy.value = '';
  if (blob) show(blob, `PNG · ${extents ? '全图' : '当前视图'} · ${(blob.size / 1024).toFixed(0)} KB · ${Math.round(performance.now() - t0)} ms`);
}
function svg() {
  const s = demo.value?.viewer?.exportSvg({ background: '#ffffff' });
  if (s) show(new Blob([s], { type: 'image/svg+xml' }), `SVG · ${(s.length / 1024).toFixed(0)} KB（矢量，可无损缩放）`);
}
onBeforeUnmount(() => preview.value && URL.revokeObjectURL(preview.value.url));
</script>

<template>
  <DemoViewer ref="demo" :files="['建筑平面图.dwg', '机械零件.dwg', '总平面图.dwg']">
    <template #toolbar="{ viewer }">
      <button @click="png(true)">PNG（全图）</button>
      <button @click="png(false)">PNG（当前视图）</button>
      <button @click="svg()">SVG</button>
      <button @click="viewer?.downloadDxf()">下载 DXF</button>
      <button @click="viewer?.downloadSvg()">下载 SVG</button>
      <span class="cpd-muted">{{ busy }}</span>
    </template>
    <template #footer>
      <div v-if="preview" class="cpd-result">{{ preview.title }}<img :src="preview.url" alt="导出结果" /></div>
    </template>
  </DemoViewer>
</template>
