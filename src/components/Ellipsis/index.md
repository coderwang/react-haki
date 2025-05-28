---
nav:
  title: 组件
  order: 0
group:
  title: 基础组件
order: 1
---

# Ellipsis 文本省略

展示空间不足时，隐去部分内容。可以自动监听内容区域宽度变化，动态 展示/隐藏 按钮。

## 示例

仅展开

```jsx
import { Ellipsis } from 'react-haki';

export default () => {
  const text = 'react haki 是一个高性能、可定制、原子化的组件库。'.repeat(10);

  return <Ellipsis text={text} />;
};
```

展开收起

```jsx
import { Ellipsis } from 'react-haki';

export default () => {
  const text = 'react haki 是一个高性能、可定制、原子化的组件库。'.repeat(10);

  return <Ellipsis text={text} collapseText="收起" />;
};
```

## Ellipsis

### 属性

| 属性         | 说明             | 类型                  | 默认值     |
| ------------ | ---------------- | --------------------- | ---------- |
| text         | 文本内容（必填） | `string`              | -          |
| maxLines     | 最大行数         | `number`              | `2`        |
| expandText   | 展开文案         | `string`              | `查看更多` |
| collapseText | 收起文案         | `string`              | -          |
| className    | 类名             | `string`              | -          |
| style        | 根元素样式       | `React.CSSProperties` | -          |

### CSS 变量

| 属性                             | 说明     | 默认值 |
| -------------------------------- | -------- | ------ |
| --haki-ellipsis-text-font-size   | 字体大小 | `14px` |
| --haki-ellipsis-text-line-height | 行高     | `21px` |
