<script setup lang="ts">
import { ref } from 'vue';
import DemoViewer from '../DemoViewer.vue';
import type { CadLayout } from 'cad-preview-kit/vue';

const layouts = ref<CadLayout[]>([]);
const current = ref(0);
const theme = ref<'dark' | 'light'>('dark');
const demo = ref<InstanceType<typeof DemoViewer>>();

function onEvent(name: string, e: any) {
  if (name === 'documentloaded') { layouts.value = e.info.layouts; current.value = 0; }
  if (name === 'layoutchanging') current.value = e.index;
}
</script>

<template>
  <DemoViewer ref="demo" :files="['建筑平面图.dwg', '机械零件.dwg']" :theme="theme" @viewer-event="onEvent">
    <template #toolbar="{ viewer }">
      <span class="cpd-muted">布局：</span>
      <button v-for="(l, i) in layouts" :key="l.name" :class="{ on: i === current }" @click="viewer?.setLayout(i)">{{ l.model ? '模型' : l.name }}</button>
      <span class="cpd-sep" />
      <button @click="viewer?.fitView()">全图显示</button>
      <button @click="theme = theme === 'dark' ? 'light' : 'dark'">背景：{{ theme === 'dark' ? '深色' : '浅色' }}</button>
    </template>
  </DemoViewer>
</template>
