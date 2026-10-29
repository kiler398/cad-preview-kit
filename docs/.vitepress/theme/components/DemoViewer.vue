<script setup lang="ts">
/**
 * 通用演示容器：文件切换 + 预览器。
 * 通过插槽把预览器实例（viewer）和当前文件交给具体演示，用来放工具栏。
 */
import { ref, shallowRef } from 'vue';
import { CadViewer, type CadViewerOptions } from 'cad-preview-kit/vue';
import { sample } from '../shared';

const props = withDefaults(defineProps<{
  files: string[];
  height?: string;
  options?: CadViewerOptions;
  theme?: 'dark' | 'light';
  upload?: boolean;
}>(), { height: '520px', options: () => ({}), theme: 'dark', upload: true });

const emit = defineEmits<{ (e: 'viewer-event', name: string, evt: unknown): void }>();

const current = ref(props.files[0]);
const src = shallowRef<string | File>(sample(props.files[0]));
const viewer = ref<InstanceType<typeof CadViewer>>();

function pick(name: string) {
  current.value = name;
  src.value = sample(name);
}
function onUpload(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (!f) return;
  current.value = f.name;
  src.value = f;
  (e.target as HTMLInputElement).value = '';
}
defineExpose({ viewer });
</script>

<template>
  <div class="cpd-demo">
    <div class="cpd-files">
      <button v-for="f in files" :key="f" :class="{ on: f === current }" @click="pick(f)">{{ f }}</button>
      <label v-if="upload" class="cpd-upload">本地 DWG / DXF…<input type="file" accept=".dwg,.dxf" @change="onUpload" /></label>
    </div>
    <div v-if="$slots.toolbar" class="cpd-toolbar">
      <slot name="toolbar" :viewer="viewer" :file="current" />
    </div>
    <div class="cpd-stage" :style="{ height }">
      <CadViewer ref="viewer" :src="src" :file-name="current" :options="options" :theme="theme" locale="zh-CN"
        @documentloaded="(e: unknown) => emit('viewer-event', 'documentloaded', e)" @layoutchanging="(e: unknown) => emit('viewer-event', 'layoutchanging', e)" @layerschanged="(e: unknown) => emit('viewer-event', 'layerschanged', e)"
        @measure="(e: unknown) => emit('viewer-event', 'measure', e)" @updatefindmatchescount="(e: unknown) => emit('viewer-event', 'updatefindmatchescount', e)" @error="(e: unknown) => emit('viewer-event', 'error', e)" />
    </div>
    <slot name="footer" :viewer="viewer" :file="current" />
  </div>
</template>
