import { defineConfig } from 'vitepress';

// GitHub Pages 部署在 https://kiler398.github.io/cad-preview-kit/ ，CI 中通过 DOCS_BASE 传入；本地默认 '/'
const base = (process.env.DOCS_BASE ?? '/') as `/${string}/` | '/';

const zhNav = [
  { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
  { text: '功能', link: '/features/layouts', activeMatch: '/features/' },
  { text: 'API', link: '/api/options', activeMatch: '/api/' },
  { text: '在线演示', link: '/playground' },
  { text: '常见问题', link: '/faq' },
  { text: 'npm', link: 'https://www.npmjs.com/package/cad-preview-kit' },
];

const zhSidebar = {
  '/': [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/guide/introduction' },
        { text: '格式与对象支持', link: '/guide/formats' },
        { text: '安装与环境要求', link: '/guide/installation' },
        { text: '快速开始', link: '/guide/quick-start' },
        { text: '构建工具与部署', link: '/guide/bundlers' },
        { text: '外观、字体与国际化', link: '/guide/theming' },
      ],
    },
    {
      text: '功能',
      items: [
        { text: '视图与布局', link: '/features/layouts' },
        { text: '图层', link: '/features/layers' },
        { text: '测量与文字查找', link: '/features/measure-search' },
        { text: '导出 PNG / SVG / DXF', link: '/features/export' },
        { text: '无头 API 与命令行', link: '/features/headless' },
      ],
    },
    {
      text: 'API',
      items: [
        { text: '属性与选项', link: '/api/options' },
        { text: '事件', link: '/api/events' },
        { text: '实例方法', link: '/api/methods' },
        { text: 'TypeScript 类型', link: '/api/types' },
      ],
    },
    {
      text: '其他',
      items: [
        { text: '在线演示', link: '/playground' },
        { text: '常见问题与已知限制', link: '/faq' },
        { text: '许可协议', link: '/license' },
      ],
    },
  ],
};

export default defineConfig({
  base,
  title: 'cad-preview-kit',
  description: 'DWG / DXF 在线预览组件（Rust + WebAssembly + WebGL2）',
  cleanUrls: true,
  lastUpdated: false,
  head: [['meta', { name: 'theme-color', content: '#1f6f8b' }]],

  // 多语言预留：新增英文时在 locales 中加入 en，并在 docs/en/ 下放置对应页面
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        outline: { level: [2, 3], label: '本页目录' },
        docFooter: { prev: '上一页', next: '下一页' },
        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        footer: {
          message: '组件源码不公开 · npm 发布的成品可免费商用（见许可协议）',
          copyright: `© ${new Date().getFullYear()} kiler3982`,
        },
      },
    },
    // en: { label: 'English', lang: 'en-US', link: '/en/', themeConfig: { nav: [...], sidebar: {...} } },
  },

  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/kiler398/cad-preview-kit' }],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: { noResultsText: '没有找到结果', resetButtonTitle: '清除', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } },
            },
          },
        },
      },
    },
  },

  vite: {
    // 组件内部通过 new URL('…wasm', import.meta.url) 加载 WASM，开发服务器的依赖预构建会破坏这个路径
    optimizeDeps: { exclude: ['cad-preview-kit'] },
  },
});
