---
nav:
  title: 组件
  order: 0
group:
  title: 动效组件
  order: 4
order: 1
---

# DigitScrollMatch 数字滚动匹配

数字滚动匹配组件，支持数字滚动匹配。

## 示例

```jsx
import React from 'react';
import { DigitScrollMatch } from 'react-haki';

export default () => (
  <DigitScrollMatch targetNumber={345} delay={1000} duration={800} />
);
```

## DigitScrollMatch

### 属性

| 属性         | 说明                 | 类型                                       | 默认值      |
| ------------ | -------------------- | ------------------------------------------ | ----------- |
| targetNumber | 目标数字（必填）     | `number`                                   | -           |
| delay        | 延迟时间，单位：毫秒 | `number`                                   | `0`         |
| duration     | 动画时长，单位：毫秒 | `number`                                   | `800`       |
| direction    | 滚动方向             | `'up' \| 'down' \| 'up-down' \| 'down-up'` | `'up-down'` |
| className    | 类名                 | `string`                                   | -           |
| style        | 根元素样式           | `React.CSSProperties`                      | -           |

### CSS 变量

| 属性                                  | 说明     | 默认值    |
| ------------------------------------- | -------- | --------- |
| --haki-digit-scroll-match-height      | 高度     | `67px`    |
| --haki-digit-scroll-match-font-size   | 字体大小 | `56px`    |
| --haki-digit-scroll-match-font-weight | 字体粗细 | `700`     |
| --haki-digit-scroll-match-color       | 颜色     | `#e9172f` |
