# 构建工具与部署

## WASM 文件

内核的 JS 胶水代码通过 `new URL('cpk_core_bg.wasm', import.meta.url)` 引用 WASM 文件。Vite、webpack 5、Rollup、esbuild（`--loader:.wasm=file`）都会把它作为静态资源复制到产物中，**无需额外配置**。

### Vite 开发服务器

Vite 的依赖预构建会改变 `import.meta.url`，需要把本包排除在预构建之外：

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: { exclude: ['cad-preview-kit'] },
});
```

### 自托管 / CDN

如果 WASM 放在其他位置（CDN、内网静态服务器），通过 `wasmUrl` 指定：

```ts
new CadViewer(el, { wasmUrl: 'https://cdn.example.com/cad-preview-kit/0.1.0/cpk_core_bg.wasm' });
```

服务器应以 `application/wasm` 返回 `.wasm` 文件，以便流式编译；MIME 不对时也能工作，只是稍慢。

## Web Worker 与 CSP

解析在 Web Worker 中进行。Worker 由 `blob:` URL 创建（不需要额外的 Worker 文件）。如果站点的内容安全策略禁止 `blob:` Worker：

- 在 CSP 中加入 `worker-src blob:`，或者
- 传入 `worker: false`，在主线程解析（大图纸会短暂阻塞界面）

WebAssembly 编译需要 CSP 允许 `'wasm-unsafe-eval'`（或 `'unsafe-eval'`）。

## SSR（Nuxt / Next.js）

所有入口都可以在服务端安全导入（不会访问 `window`）。组件只在客户端挂载：

- Nuxt：用 `<ClientOnly>` 包裹
- Next.js：`dynamic(() => import('cad-preview-kit/react').then(m => m.CadViewer), { ssr: false })`

## 跨域文件

`src` 为 URL 时通过 `fetch` 下载，文件服务器需要允许跨域（CORS）。需要携带 Cookie 或令牌时：

```ts
new CadViewer(el, { fetchInit: { credentials: 'include', headers: { Authorization: 'Bearer …' } } });
```
