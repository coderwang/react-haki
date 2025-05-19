---
nav:
  title: 组件
  order: 0
group:
  title: 基础组件
order: 2
---

# RichTextEllipsis 富文本省略

展示空间不足时，隐去部分内容。可以自动监听内容区域高度变化，动态 展示/隐藏 按钮。也可用于纯文本的省略。

## 示例

普通文本

```jsx
import { RichTextEllipsis } from 'react-haki';

export default () => {
  const content = 'react haki 是一个高性能、可定制、原子化的组件库。'.repeat(
    30,
  );

  return <RichTextEllipsis content={content} />;
};
```

富文本（组件形式）

```jsx
import { RichTextEllipsis } from 'react-haki';

export default () => {
  const content = (
    <div>
      <div>react haki 是一个非常好用的的组件库。</div>
      <p>特性：</p>
      <ul>
        <li>高性能</li>
        <li>可定制</li>
        <li>原子化</li>
      </ul>
      <p>
        使用方法：
        <code>npm install react-haki</code>
      </p>
    </div>
  );

  return <RichTextEllipsis content={content} />;
};
```

富文本（模版字符串形式）

```jsx
import { RichTextEllipsis } from 'react-haki';

export default () => {
  const content = `
    <div>
      <div>react haki 是一个非常好用的的组件库。</div>
      <p>特性：</p>
      <ul>
        <li>高性能</li>
        <li>可定制</li>
        <li>原子化</li>
      </ul>
      <p>
        使用方法：
        <code>npm install react-haki</code>
      </p>
    </div>`;

  return <RichTextEllipsis content={content} />;
};
```

自定义展开样式

```jsx
import { RichTextEllipsis } from 'react-haki';

export default () => {
  const content = 'react haki 是一个高性能、可定制、原子化的组件库。'.repeat(
    30,
  );

  return (
    <RichTextEllipsis
      content={content}
      expandText={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            width: '100%',
          }}
        >
          <div
            style={{
              flex: 1,
              maxWidth: '144px',
              height: '1px',
              backgroundColor: '#06605a',
            }}
          />
          <div>点击解锁</div>
          <div
            style={{
              flex: 1,
              maxWidth: '144px',
              height: '1px',
              backgroundColor: '#06605a',
            }}
          />
        </div>
      }
    />
  );
};
```

## RichTextEllipsis

### 属性

| 属性       | 说明         | 类型                        | 默认值     |
| ---------- | ------------ | --------------------------- | ---------- |
| content    | 内容（必填） | `string \| React.ReactNode` | -          |
| maxHeight  | 最大高度     | `number`                    | `150`      |
| expandText | 展开文案     | `string \| React.ReactNode` | `查看更多` |
