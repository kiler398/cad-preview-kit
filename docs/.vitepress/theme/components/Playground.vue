<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import { CadViewer, type CadInfo, type CadEventMap } from 'cad-preview-kit/vue';
import { SAMPLE_GROUPS, sample } from '../shared';

const src = shallowRef<string | File | null>(sample('建筑平面图.dwg'));
const fileName = ref('建筑平面图.dwg');
const phone = ref(false);
const theme = ref<'dark' | 'light'>('dark');
const viewer = ref<InstanceType<typeof CadViewer>>();
const info = ref<CadInfo | null>(null);
const layout = ref(0);
const measuring = ref(false);
const query = ref('');
const matches = ref('');
const log = ref<string[]>([]);
const times = ref('');
const watermark = ref(false);
let t0 = typeof performance !== 'undefined' ? performance.now() : 0;

const push = (s: string) => { log.value.unshift(s); if (log.value.length > 60) log.value.length = 60; };
const counts = computed(() => info.value ? Object.entries(info.value.counts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k.padEnd(13)} ${v}`).join('\n') : '');

function pick(name: string) { fileName.value = name; src.value = sample(name); t0 = performance.now(); }
function onUpload(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (!f) return;
  fileName.value = f.name;
  src.value = f;
  t0 = performance.now();
  (e.target as HTMLInputElement).value = '';
}
function onLoaded(e: CadEventMap['documentloaded']) {
  info.value = e.info;
  layout.value = 0;
  measuring.value = false;
  times.value = t0 ? `${Math.round(performance.now() - t0)} ms` : '';
  push(`documentloaded · ${e.fileName} · ${e.info.format} ${e.info.version}`);
}
function onLayout(e: CadEventMap['layoutchanging']) { layout.value = e.index; push(`layoutchanging · ${e.layout.name}`); }
function onLayoutLoaded(e: CadEventMap['layoutloaded']) {
  const u = Object.keys(e.unsupported);
  push(`layoutloaded · ${e.layout.name}${e.truncated ? ' · 已截断' : ''}${u.length ? ' · 未支持 ' + u.join(',') : ''}`);
}
function onMeasure(e: CadEventMap['measure']) { const r = e.result; push(`measure · ${r.distance.toFixed(3)} ${r.unit} · ${r.angle.toFixed(1)}°`); }
function onLayers(e: CadEventMap['layerschanged']) { push(`layerschanged · 可见 ${e.layers.filter((l) => l.visible).length}/${e.layers.length}`); }
function onFind(e: CadEventMap['updatefindmatchescount']) { matches.value = e.matchesCount.total ? `${e.matchesCount.current}/${e.matchesCount.total}` : '无结果'; }
function onError(e: Error) { push(`✘ ${e.message}`); }

function toggleMeasure() { measuring.value = !measuring.value; viewer.value?.setTool(measuring.value ? 'measure' : 'pan'); }
function toggleWatermark() {
  watermark.value = !watermark.value;
  viewer.value?.setWatermark(watermark.value ? 'cad-preview-kit 演示' : null);
}
async function exportPng() {
  const b = await viewer.value?.renderToImage({ extents: true, width: 2000, height: 1400, scale: 1, background: '#ffffff' });
  if (!b) return;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(b);
  a.download = fileName.value.replace(/\.\w+$/, '') + '.png';
  a.click();
}
</script>

<template>
  <div class="cpd-pg">
    <aside>
      <h4>示例图纸</h4>
      <template v-for="g in SAMPLE_GROUPS" :key="g.group">
        <div class="row" style="margin-bottom: 6px">
          <button v-for="f in g.items" :key="f" :class="{ on: f === fileName }" @click="pick(f)">{{ f }}</button>
        </div>
      </template>
      <label class="cpd-upload" style="display: inline-flex; align-items: center; position: relative">打开本地 DWG / DXF…<input type="file" accept=".dwg,.dxf" @change="onUpload" /></label>

      <h4>显示</h4>
      <div class="row">
        <button :class="{ on: !phone }" @click="phone = false">桌面</button>
        <button :class="{ on: phone }" @click="phone = true">手机</button>
        <button @click="theme = theme === 'dark' ? 'light' : 'dark'">{{ theme === 'dark' ? '深色背景' : '浅色背景' }}</button>
        <button :class="{ on: watermark }" @click="toggleWatermark">水印</button>
      </div>

      <template v-if="info">
        <h4>布局</h4>
        <div class="row">
          <button v-for="(l, i) in info.layouts" :key="l.name" :class="{ on: i === layout }" @click="viewer?.setLayout(i)">{{ l.model ? '模型' : l.name }}</button>
        </div>

        <h4>工具</h4>
        <div class="row">
          <button :class="{ on: measuring }" @click="toggleMeasure">测量</button>
          <button @click="viewer?.toggleLayerPanel()">图层面板</button>
          <button @click="viewer?.fitView()">全图</button>
        </div>
        <div class="row" style="margin-top: 6px">
          <input v-model="query" type="search" placeholder="查找文字，回车" @keydown.enter="viewer?.search(query)" />
          <span class="cpd-muted">{{ matches }}</span>
        </div>

        <h4>导出</h4>
        <div class="row">
          <button @click="exportPng">PNG</button>
          <button @click="viewer?.downloadSvg()">SVG</button>
          <button @click="viewer?.downloadDxf()">DXF</button>
        </div>

        <h4>图纸信息</h4>
        <dl>
          <dt>格式</dt><dd>{{ info.format }} {{ info.version }}{{ info.release ? `（AutoCAD ${info.release}）` : '' }}</dd>
          <dt>单位</dt><dd>{{ info.unitName || '未指定' }}</dd>
          <dt>图层</dt><dd>{{ info.layers.length }}</dd>
          <dt>块定义</dt><dd>{{ info.blocks }}</dd>
          <dt>实体</dt><dd>{{ info.entities }}</dd>
          <dt>打开耗时</dt><dd>{{ times }}</dd>
        </dl>
        <pre style="margin-top: 6px">{{ counts }}</pre>
      </template>

      <h4>事件</h4>
      <pre>{{ log.join('\n') }}</pre>
    </aside>
    <main :class="{ phone }">
      <div :style="phone ? '' : 'position:absolute;inset:0'">
        <CadViewer ref="viewer" :src="src" :file-name="fileName" :theme="theme" locale="zh-CN"
          @documentloaded="onLoaded" @layoutchanging="onLayout" @layoutloaded="onLayoutLoaded" @measure="onMeasure"
          @layerschanged="onLayers" @updatefindmatchescount="onFind" @error="onError" />
      </div>
    </main>
  </div>
</template>
