# ShredBladeWeb 首页 (Index.tsx) 结构描述文件

此文件用于描述当前首页的内容结构，方便用户针对特定部分提出修改需求。

## 1. 顶部导航 (Header)
- 引用 `<Header />` 组件

## 2. 移动端悬浮 CTA (Mobile Sticky CTA)
- **位置**: 仅移动端显示，固定在顶部 (`fixed top-0`)
- **内容**: "Get a Trial Order Quote" 按钮
- **链接**: 跳转至 `/contact-us`

## 3. 首屏 Hero 区域 (Hero Section)
- **背景**: 全屏视频背景 (`/src/videos/shredder-runing.mp4`)，带黑色遮罩 (`opacity-40`)
- **布局**: 内容靠右对齐 (`justify-end`)
- **右侧内容区域**:
  - **主标题 (H1)**: "Industrial Shredder Blades Manufacturer"
  - **副标题**: "OEM & Replacement Blades for Single, Double & Four Shaft Shredders"
  - **CTA 按钮**: "Get a Trial Order Quote" (跳转至 `/contact-us`)
  - *注意*: 此区域包含渐入动画 (`transition-opacity`, `translate-y`)

## 4. 客户痛点板块 (Customer Problems Section)
- **背景**: 浅灰背景 (`bg-gray-50`)
- **标题 (H2)**: "Common Shredder Blade Problems"
- **详情卡片 (Grid Layout)**:
  1. Blades wear too fast, frequent replacement required
  2. High downtime caused by unstable cutting performance
  3. OEM replacement blades are expensive
  4. Inconsistent blade quality between batches
- **强调框 (Blue Border Box)**:
  - **标题**: "Do you experience:"
  - **列表**: Frequent blade replacements? / High blade costs from OEM? / Unstable cutting performance? / Downtime due to blade failures?
  - **总结文字**: "We help recycling operations reduce blade cost and downtime..."

## 5. 应用场景板块 (Applications Section)
- **标题 (H2)**: "Shredder Blade Solutions by Application"
- **产品列表 (Grid Layout)**:
  - Plastic Recycling (链接: `/shredder-blades-for-plastic-recycling`)
  - Metal Recycling (链接: `/shredder-blades-for-metal-recycling`)
  - E-waste Recycling (链接: `/shredder-blades-for-ewaste-recycling`)
  - Tire Recycling (链接: `/shredder-blades-for-tire-recycling`)
- **底部备注**: "Each application requires different blade material and heat treatment."

## 6. 优势板块 (Why Choose Us Section)
- **背景**: 浅蓝背景 (`bg-blue-50`)
- **标题 (H2)**: "Why Work with Us"
- **优势列表 (Checklist)**:
  - Manufacturer specialized in shredder blades only
  - Application-based material selection and heat treatment
  - Compatible with major global shredder brands
  - Trial orders supported before long-term supply

## 7. 合作流程板块 (Process Section)
- **标题 (H2)**: "Our Working Process"
- **步骤列表 (1-6)**:
  1. Application
  2. Drawing / Sample
  3. Material Recommendation
  4. Trial Order
  5. Performance Evaluation
  6. Long-term Supply

## 8. 底部 CTA 板块 (Final CTA Section)
- **背景**: 蓝紫渐变 (`bg-gradient-to-r from-blue-900 to-blue-700`)
- **标题 (H2)**: "Start with a Trial Order"
- **描述**: "Trial order available for performance comparison. Send your drawing, blade photo or application details."
- **CTA 按钮**: "Get a Trial Order Quote" (跳转至 `/contact-us`)

## 9. 底部导航 (Footer)
- 引用 `<Footer />` 组件
