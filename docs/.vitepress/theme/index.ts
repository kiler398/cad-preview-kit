import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './custom.css';
import Playground from './components/Playground.vue';
import BasicDemo from './components/demos/BasicDemo.vue';
import LayoutDemo from './components/demos/LayoutDemo.vue';
import LayerDemo from './components/demos/LayerDemo.vue';
import MeasureDemo from './components/demos/MeasureDemo.vue';
import ExportDemo from './components/demos/ExportDemo.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 演示组件依赖浏览器 API，Markdown 中统一包在 <ClientOnly> 里使用
    app.component('Playground', Playground);
    app.component('BasicDemo', BasicDemo);
    app.component('LayoutDemo', LayoutDemo);
    app.component('LayerDemo', LayerDemo);
    app.component('MeasureDemo', MeasureDemo);
    app.component('ExportDemo', ExportDemo);
  },
} satisfies Theme;
