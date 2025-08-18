---
nav:
  title: 组件
  order: 0
group:
  title: 业务组件
  order: 3
---

# RippleButton 波纹按钮

Hover 后出波纹动画的按钮。

## 示例

<code src="react-haki/demo/components/RippleButton/demo.tsx" title="默认"></code>
<code src="react-haki/demo/components/RippleButton/demo2.tsx" title="loading态"></code>
<code src="react-haki/demo/components/RippleButton/demo3.tsx" title="成功态"></code>
<code src="react-haki/demo/components/RippleButton/demo4.tsx" title="禁用态"></code>
<code src="react-haki/demo/components/RippleButton/demo5.tsx" title="loading态禁用"></code>
<code src="react-haki/demo/components/RippleButton/demo6.tsx" title="成功态禁用"></code>

## RippleButton

### 属性

| 属性        | 说明         | 类型                                            | 默认值    |
| ----------- | ------------ | ----------------------------------------------- | --------- |
| children    | 内容（必填） | `React.ReactNode`                               | -         |
| onClick     | 按钮点击事件 | `(e: React.MouseEvent<HTMLDivElement>) => void` | -         |
| className   | 类名         | `string`                                        | -         |
| style       | 根元素样式   | `React.CSSProperties`                           | -         |
| disabled    | 是否禁用     | `boolean`                                       | `false`   |
| clickStatus | 当前按钮状态 | `'default' \| 'loading' \| 'success'`           | `default` |
