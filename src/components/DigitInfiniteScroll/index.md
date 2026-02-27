---
nav:
  title: 组件
  order: 0
group:
  title: 动效组件
  order: 4
---

# DigitInfiniteScroll 数字无限滚动

数字无限滚动组件，支持向上和向下滚动。

## 示例

仅 1 位

```jsx
import React from 'react';
import { DigitInfiniteScroll } from 'react-haki';

export default () => (
  <DigitInfiniteScroll direction="down" duration={3000} randomDigits />
);
```

多位

```jsx
import React from 'react';
import { DigitInfiniteScroll } from 'react-haki';

export default () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
      <DigitInfiniteScroll startDigit={3} />
      <DigitInfiniteScroll direction="down" />
      <DigitInfiniteScroll startDigit={5} />
    </div>
  );
};
```

## DigitInfiniteScroll

### 属性

| 属性         | 说明                 | 类型                  | 默认值                  |
| ------------ | -------------------- | --------------------- | ----------------------- |
| direction    | 滚动方向             | `'up' \| 'down'`      | `'up'`                  |
| duration     | 动画时长，单位：毫秒 | `number`              | `800`                   |
| digits       | 数字列表，优先级最低 | `Digit[]`             | `[0,1,2,3,4,5,6,7,8,9]` |
| startDigit   | 开始数字，优先级第二 | `Digit`               | `0`                     |
| randomDigits | 随机数字，优先级最高 | `boolean`             | `false`                 |
| className    | 类名                 | `string`              | -                       |
| style        | 根元素样式           | `React.CSSProperties` | -                       |

### CSS 变量

| 属性                                   | 说明     | 默认值    |
| -------------------------------------- | -------- | --------- |
| --haki-digit-infinite-scroll-height    | 高度     | `67px`    |
| --haki-digit-infinite-scroll-font-size | 字体大小 | `56px`    |
| --haki-digit-infinite-scroll-color     | 颜色     | `#e9172f` |
