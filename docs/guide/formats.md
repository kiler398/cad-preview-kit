# 格式与对象支持

## 文件格式

| 格式 | 版本 | 说明 |
|---|---|---|
| DWG | R13、R14、2000、2004、2007、2010、2013、2018（AC1012 – AC1032） | 原生二进制读取 |
| DXF（ASCII） | R12 – 2018+ | |
| DXF（二进制） | R12 – 2018+ | |

格式依据文件内容识别：DWG 以 `AC10xx` 开头，二进制 DXF 以 `AutoCAD Binary DXF` 开头，ASCII DXF 以组码 `0 / SECTION` 开头。扩展名不正确的文件也能打开。

2007 之前的版本按图纸的 `$DWGCODEPAGE` 解码文字（支持 GBK、Big5、Shift-JIS 等约 40 种代码页）。

## 图形对象

| 对象 | 支持 | 说明 |
|---|---|---|
| LINE、CIRCLE、ARC、ELLIPSE | ✅ | 包括拉伸方向为 (0,0,-1) 的镜像对象 |
| LWPOLYLINE、POLYLINE（2D / 3D） | ✅ | 凸度圆弧、起止宽度（实心宽线）、样条拟合 |
| SPLINE、HELIX | ✅ | 有理 NURBS；只有拟合点时按拟合点插值 |
| HATCH | ✅ | 实体填充、图案填充（虚线图案）、线性 / 球形 / 圆柱等渐变；嵌套孤岛按偶奇规则处理 |
| SOLID、TRACE、3DFACE | ✅ | 3DFACE 按可见边绘制 |
| TEXT、ATTRIB、ATTDEF | ✅ | 九种对齐、对齐 / 布满、宽度因子、倾斜角、`%%c` `%%d` `%%p` 等控制码 |
| MTEXT | ✅ | 段落、自动换行、附着点、行距；字符级格式（颜色、字体切换）显示为纯文本 |
| INSERT、MINSERT | ✅ | 嵌套块、非等比缩放、阵列；可见属性 |
| DIMENSION | ✅ | 优先使用图纸中的标注块（与 AutoCAD 显示一致），没有时按标注样式生成 |
| LEADER、MULTILEADER、MLINE、ACAD_TABLE | ✅ | |
| POINT | ✅ | 按 `$PDMODE` / `$PDSIZE` 显示点样式 |
| XLINE、RAY | ✅ | 裁剪到图形范围的数倍 |
| VIEWPORT（图纸空间） | ✅ | 按比例显示模型空间、视口冻结图层 |
| MESH、POLYFACE、POLYGON MESH | ✅ | 线框 |
| 3DSOLID、REGION、BODY | ⚠️ | 能解析出 ACIS 线框的显示线框 |
| IMAGE | ⚠️ | 只显示边框（外部图片文件无法读取） |
| WIPEOUT、OLE、PDF / DWF 参考底图、SHAPE、代理对象 | ❌ | 不显示；打开后右下角会提示未显示的对象类型和数量 |
| 外部参照（XREF） | ❌ | 外部文件无法在浏览器中解析，会在警告中列出 |

## 样式

- **颜色**：ACI 索引色、真彩色、ByLayer、ByBlock。ACI 7（白 / 黑）随背景切换；与背景颜色过于接近的颜色自动换成前景色；浅色背景上的亮黄、亮绿会自动加深，保证可读
- **线型**：按 `$LTSCALE × 对象线型比例` 生成虚线、点划线；过密的线型（一段线上超过 2500 个周期）按实线绘制
- **透明度**：对象透明度应用到填充
- **线宽**：按细线绘制（相当于 AutoCAD 关闭“显示线宽”）

## 文字

浏览器无法使用 AutoCAD 的 SHX 字体，文字用系统字体绘制：样式中设置了 TrueType 字体（如“宋体”“Arial”）时优先使用该字体，否则使用 [`fontFamily`](/api/options#fontfamily)。文字高度按 AutoCAD 的“大写字母高度”换算，中文字符按全高对齐，与 AutoCAD 的视觉大小基本一致。
