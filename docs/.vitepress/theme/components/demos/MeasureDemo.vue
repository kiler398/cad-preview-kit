<script setup lang="ts">
import { ref } from 'vue';
import DemoViewer from '../DemoViewer.vue';

const result = ref('');
const query = ref('卧室');
const count = ref('');
const measuring = ref(false);

function onEvent(name: string, e: any) {
  if (name === 'measure') {
    const r = e.result;
    result.value = `距离 ${r.distance.toFixed(2)} ${r.unit}　Δx ${r.dx.toFixed(2)}　Δy ${r.dy.toFixed(2)}　角度 ${r.angle.toFixed(1)}°`;
  }
  if (name === 'updatefindmatchescount') count.value = e.matchesCount.total ? `${e.matchesCount.current}/${e.matchesCount.total}` : '无结果';
  if (name === 'documentloaded') { result.value = ''; count.value = ''; measuring.value = false; }
}
</script>

<template>
  <DemoViewer :files="['建筑平面图.dwg', '机械零件.dxf']" @viewer-event="onEvent">
    <template #toolbar="{ viewer }">
      <button :class="{ on: measuring }" @click="measuring = !measuring; viewer?.setTool(measuring ? 'measure' : 'pan')">测量距离</button>
      <span class="cpd-muted">{{ result || (measuring ? '在图中依次点击两点（自动捕捉端点、圆心、象限点）' : '') }}</span>
      <span class="cpd-sep" />
      <input v-model="query" type="search" placeholder="查找文字" style="width: 110px" @keydown.enter="viewer?.search(query)" />
      <button @click="viewer?.search(query)">查找</button>
      <button @click="viewer?.findNext()">下一个</button>
      <span class="cpd-muted">{{ count }}</span>
    </template>
  </DemoViewer>
</template>
