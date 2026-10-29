# Third-Party Notices / 第三方许可声明

cad-preview-kit 本身不开源（见 [LICENSE](LICENSE)），但它包含以下开源组件。这些组件按各自的许可证授权，[LICENSE](LICENSE) 第 2 条的限制不适用于它们。

cad-preview-kit itself is not open source (see [LICENSE](LICENSE)), but it contains the open-source components below, each licensed under its own terms. The restrictions in section 2 of the [LICENSE](LICENSE) do not apply to them.

本软件不包含任何 GPL / LGPL / AGPL 许可的代码。The Software contains no GPL / LGPL / AGPL licensed code.

## acadrust — Mozilla Public License 2.0

DWG / DXF 读取由 [acadrust](https://github.com/hakanaktt/acadrust) 提供，以**未修改**的形式编译进 `dist/wasm/cpk_core_bg.wasm`。按 MPL-2.0 第 3.2 条，acadrust 的源代码可从以下位置获取：

DWG / DXF reading is provided by [acadrust](https://github.com/hakanaktt/acadrust), compiled **unmodified** into `dist/wasm/cpk_core_bg.wasm`. As required by section 3.2 of the MPL-2.0, the source code of acadrust is available at:

- <https://crates.io/crates/acadrust/0.6.8> (version 0.6.8, the exact version used)
- <https://github.com/hakanaktt/acadrust>

MPL-2.0 全文 / full text: <https://www.mozilla.org/en-US/MPL/2.0/>

### ACadSharp — MIT (contained in acadrust)

acadrust 的 DWG 读写代码移植自 ACadSharp。The DWG reader/writer in acadrust is ported from ACadSharp.

```
Copyright (c) 2021 Albert Domenech

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 编译进 WebAssembly 的全部 Rust crate / All Rust crates compiled into the WebAssembly binary

| Crate | Version | License | Repository |
|---|---|---|---|
| acadrust | 0.6.8 | MPL-2.0 | https://github.com/hakanaktt/acadrust |
| adler2 | 2.0.1 | 0BSD OR MIT OR Apache-2.0 | https://github.com/oyvindln/adler2 |
| anyhow | 1.0.104 | MIT OR Apache-2.0 | https://github.com/dtolnay/anyhow |
| arrayvec | 0.7.8 | MIT OR Apache-2.0 | https://github.com/bluss/arrayvec |
| bitflags | 2.13.2 | MIT OR Apache-2.0 | https://github.com/bitflags/bitflags |
| bumpalo | 3.20.3 | MIT OR Apache-2.0 | https://github.com/fitzgen/bumpalo |
| byteorder | 1.5.0 | Unlicense OR MIT | https://github.com/BurntSushi/byteorder |
| cfg-if | 1.0.5 | MIT OR Apache-2.0 | https://github.com/rust-lang/cfg-if |
| crc32fast | 1.5.3 | MIT OR Apache-2.0 | https://github.com/srijs/rust-crc32fast |
| encoding_rs | 0.8.42 | (Apache-2.0 OR MIT) AND BSD-3-Clause | https://github.com/hsivonen/encoding_rs |
| equivalent | 1.0.3 | Apache-2.0 OR MIT | https://github.com/indexmap-rs/equivalent |
| euclid | 0.22.14 | MIT OR Apache-2.0 | https://github.com/servo/euclid |
| flate2 | 1.1.10 | MIT OR Apache-2.0 | https://github.com/rust-lang/flate2-rs |
| float_next_after | 1.0.0 | MIT | https://gitlab.com/bronsonbdevost/next_afterf |
| foldhash | 0.2.0 | Zlib | https://github.com/orlp/foldhash |
| futures-core | 0.3.34 | MIT OR Apache-2.0 | https://github.com/rust-lang/futures-rs |
| futures-task | 0.3.34 | MIT OR Apache-2.0 | https://github.com/rust-lang/futures-rs |
| futures-util | 0.3.34 | MIT OR Apache-2.0 | https://github.com/rust-lang/futures-rs |
| hashbrown | 0.17.1 | MIT OR Apache-2.0 | https://github.com/rust-lang/hashbrown |
| indexmap | 2.14.2 | Apache-2.0 OR MIT | https://github.com/indexmap-rs/indexmap |
| itoa | 1.0.18 | MIT OR Apache-2.0 | https://github.com/dtolnay/itoa |
| js-sys | 0.3.106 | MIT OR Apache-2.0 | https://github.com/wasm-bindgen/wasm-bindgen/tree/master/crates/js-sys |
| libm | 0.2.16 | MIT | https://github.com/rust-lang/compiler-builtins |
| lyon_geom | 1.0.20 | MIT OR Apache-2.0 | https://github.com/nical/lyon |
| lyon_path | 1.0.19 | MIT OR Apache-2.0 | https://github.com/nical/lyon |
| lyon_tessellation | 1.0.23 | MIT OR Apache-2.0 | https://github.com/nical/lyon |
| memchr | 2.8.3 | Unlicense OR MIT | https://github.com/BurntSushi/memchr |
| minimal-lexical | 0.2.1 | MIT/Apache-2.0 | https://github.com/Alexhuszagh/minimal-lexical |
| miniz_oxide | 0.9.1 | MIT OR Zlib OR Apache-2.0 | https://github.com/Frommi/miniz_oxide/tree/master/miniz_oxide |
| multiversion_no_op | 1.0.0 | Apache-2.0 OR MIT | https://github.com/hsivonen/multiversion_no_op |
| nom | 7.1.3 | MIT | https://github.com/Geal/nom |
| num-traits | 0.2.19 | MIT OR Apache-2.0 | https://github.com/rust-num/num-traits |
| oem_cp | 2.1.2 | MIT | https://github.com/tats-u/rust-oem-cp/ |
| once_cell | 1.21.4 | MIT OR Apache-2.0 | https://github.com/matklad/once_cell |
| phf | 0.11.3 | MIT | https://github.com/rust-phf/rust-phf |
| phf_shared | 0.11.3 | MIT | https://github.com/rust-phf/rust-phf |
| pin-project-lite | 0.2.17 | Apache-2.0 OR MIT | https://github.com/taiki-e/pin-project-lite |
| proc-macro2 | 1.0.107 | MIT OR Apache-2.0 | https://github.com/dtolnay/proc-macro2 |
| quote | 1.0.47 | MIT OR Apache-2.0 | https://github.com/dtolnay/quote |
| ryu | 1.0.23 | Apache-2.0 OR BSL-1.0 | https://github.com/dtolnay/ryu |
| scopeguard | 1.2.0 | MIT OR Apache-2.0 | https://github.com/bluss/scopeguard |
| serde | 1.0.229 | MIT OR Apache-2.0 | https://github.com/serde-rs/serde |
| serde_core | 1.0.229 | MIT OR Apache-2.0 | https://github.com/serde-rs/serde |
| serde_derive | 1.0.229 | MIT OR Apache-2.0 | https://github.com/serde-rs/serde |
| serde_json | 1.0.154 | MIT OR Apache-2.0 | https://github.com/serde-rs/json |
| simd-adler32 | 0.3.10 | MIT | https://github.com/mcountryman/simd-adler32 |
| siphasher | 1.0.4 | MIT OR Apache-2.0 | https://github.com/jedisct1/rust-siphash |
| slab | 0.4.12 | MIT | https://github.com/tokio-rs/slab |
| syn | 3.0.9 | MIT OR Apache-2.0 | https://github.com/dtolnay/syn |
| thiserror | 2.0.21 | MIT OR Apache-2.0 | https://github.com/dtolnay/thiserror |
| thiserror-impl | 2.0.21 | MIT OR Apache-2.0 | https://github.com/dtolnay/thiserror |
| unicode-ident | 1.0.27 | (MIT OR Apache-2.0) AND Unicode-3.0 | https://github.com/dtolnay/unicode-ident |
| wasm-bindgen | 0.2.129 | MIT OR Apache-2.0 | https://github.com/wasm-bindgen/wasm-bindgen |
| wasm-bindgen-macro | 0.2.129 | MIT OR Apache-2.0 | https://github.com/wasm-bindgen/wasm-bindgen/tree/master/crates/macro |
| wasm-bindgen-macro-support | 0.2.129 | MIT OR Apache-2.0 | https://github.com/wasm-bindgen/wasm-bindgen/tree/main/crates/macro-support |
| wasm-bindgen-shared | 0.2.129 | MIT OR Apache-2.0 | https://github.com/wasm-bindgen/wasm-bindgen/tree/master/crates/shared |
| web-time | 1.1.0 | MIT OR Apache-2.0 | https://github.com/daxpedda/web-time |
| zlib-rs | 0.6.8 | Zlib | https://github.com/trifectatechfoundation/zlib-rs |
| zmij | 1.0.23 | MIT | https://github.com/dtolnay/zmij |

各 crate 的许可证全文可在其仓库或 crates.io 页面获取。MIT / Apache-2.0 / BSD / Zlib / Unicode-3.0 / BSL-1.0 均为宽松许可证。

The full license text of each crate is available in its repository or on crates.io. MIT, Apache-2.0, BSD, Zlib, Unicode-3.0 and BSL-1.0 are permissive licenses.

## 示例图纸 / Sample drawings

文档站中的示例图纸（建筑平面图、机械零件、总平面图）为本项目原创的虚构内容，可自由使用。

The sample drawings on the documentation site are original, fictional content made for this project and may be used freely.
