<script setup lang="ts">
import DemoViewer from '../DemoViewer.vue';
import { ALL_SAMPLES } from '../../shared';
</script>

<template>
  <DemoViewer :files="ALL_SAMPLES" height="560px" />
</template>
