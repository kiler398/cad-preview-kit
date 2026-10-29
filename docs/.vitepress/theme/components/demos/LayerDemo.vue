<script setup lang="ts">
import { ref } from 'vue';
import DemoViewer from '../DemoViewer.vue';

type L = { name: string; color: number; fg?: boolean; visible: boolean };
const layers = ref<L[]>([]);
const demo = ref<InstanceType<typeof DemoViewer>>();

function refresh() {
  layers.value = (demo.value?.viewer?.getLayers() ?? []) as L[];
}
function onEvent(name: string) {
  if (name === 'documentloaded' || name === 'layerschanged') refresh();
}
function toggle(l: L) {
  demo.value?.viewer?.setLayerVisible(l.name, !l.visible);
}
const sw = (l: L) => (l.fg ? '#888' : '#' + l.color.toString(16).padStart(6, '0'));
</script>

<template>
  <DemoViewer ref="demo" :files="['建筑平面图.dwg', '总平面图.dwg', '机械零件.dwg']" @viewer-event="onEvent">
    <template #toolbar="{ viewer }">
      <div class="cpd-chips">
        <span v-for="l in layers" :key="l.name" class="cpd-chip" :class="{ off: !l.visible }" @click="toggle(l)"><i :style="{ background: sw(l) }" />{{ l.name }}</span>
      </div>
      <span class="cpd-sep" />
      <button @click="viewer?.setAllLayersVisible(true)">全部显示</button>
      <button @click="viewer?.resetLayers()">恢复图纸状态</button>
      <button @click="viewer?.toggleLayerPanel()">图层面板</button>
    </template>
  </DemoViewer>
</template>
