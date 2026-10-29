import { withBase } from 'vitepress';

/** 示例文件 URL（带上 base，兼容 GitHub Pages 子路径） */
export const sample = (name: string) => withBase('/samples/' + encodeURIComponent(name));

export const SAMPLE_GROUPS = [
  { group: '建筑', items: ['建筑平面图.dwg', '建筑平面图.dxf', '总平面图.dwg'] },
  { group: '机械', items: ['机械零件.dwg', '机械零件.dxf'] },
  { group: '性能', items: ['性能测试-2.25万块参照.dwg'] },
];

export const ALL_SAMPLES = SAMPLE_GROUPS.flatMap((g) => g.items);
