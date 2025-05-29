---
nav:
  title: 组件
  order: 0
group:
  title: 数据展示
  order: 2
---

# Empty 空态

空状态时的展示占位图。

## 示例

仅图片

```jsx
import { Empty } from 'react-haki';

export default () => <Empty />;
```

全展示

```jsx
import { Empty } from 'react-haki';

export default () => (
  <Empty
    title="无内容"
    description="请刷新页面重试"
    buttonText="刷新"
    onClick={() => {
      location.reload();
    }}
  />
);
```

## Empty

### 属性

| 属性        | 说明         | 类型                  | 默认值 |
| ----------- | ------------ | --------------------- | ------ |
| image       | 占位图       | `string`              | -      |
| title       | 标题         | `string`              | -      |
| description | 描述         | `string`              | -      |
| buttonText  | 按钮文案     | `string`              | -      |
| onClick     | 按钮点击事件 | `() => void`          | -      |
| className   | 类名         | `string`              | -      |
| style       | 根元素样式   | `React.CSSProperties` | -      |
