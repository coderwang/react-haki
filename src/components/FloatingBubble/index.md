---
nav:
  title: 组件
  order: 0
group:
  title: 动效组件
  order: 20
order: 3
---

# FloatingBubble 浮动气泡

浮动气泡组件，支持鼠标和触摸拖拽，可记忆位置，并会在窗口尺寸变化时自动保持在可视区域内。

## 示例

```jsx
import { FloatingBubble } from 'react-haki';

export default () => (
  <FloatingBubble
    storageKey="demo-floating-bubble"
    defaultOffset={{ x: 24, y: 24, xAnchor: 'right', yAnchor: 'bottom' }}
    edgeDistance={{ top: 16, right: 16, bottom: 16, left: 16 }}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100px',
      width: '100px',
      borderRadius: '50%',
      backgroundColor: 'orange',
    }}
    onClick={() => {
      alert('点击气泡');
    }}
    onOffsetChange={(offset) => {
      console.log('偏移量变化', offset);
    }}
  >
    <div
      style={{
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
    >
      浮动气泡
    </div>
  </FloatingBubble>
);
```

## 说明

- 组件支持拖拽后持久化位置，传入 `storageKey` 后会自动从本地存储中读取和写入偏移量。
- `defaultOffset` 支持通过 `xAnchor` / `yAnchor` 显式指定偏移是相对左侧、右侧、顶部还是底部计算，避免 `0` 在边缘场景下产生歧义。
- 若未传 `xAnchor` / `yAnchor`，仍会按旧规则推断：`x`、`y` 为正时相对左上角，负时相对右下角。
- 组件会在浏览器窗口尺寸变化时自动重新限制位置，避免气泡跑出可视区域。
- 拖拽和点击已区分处理，轻微抖动不会误判为拖拽，子元素的原生点击行为也会正常保留。

## FloatingBubble

### 属性

| 属性           | 说明                             | 类型                                                                                                   | 默认值                                     |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| children       | 内容（必填）                     | `React.ReactNode`                                                                                      | -                                          |
| className      | 根元素类名                       | `string`                                                                                               | -                                          |
| style          | 根元素样式                       | `React.CSSProperties`                                                                                  | -                                          |
| defaultOffset  | 默认偏移量                       | `{ x: number; y: number; xAnchor?: 'left' \| 'right'; yAnchor?: 'top' \| 'bottom' }`                   | `{ x: 0, y: 0 }`                           |
| storageKey     | 本地存储 key，用于记忆拖拽后位置 | `string`                                                                                               | -                                          |
| onOffsetChange | 偏移量变化回调，拖拽结束时触发   | `(offset: { x: number; y: number; xAnchor?: 'left' \| 'right'; yAnchor?: 'top' \| 'bottom' }) => void` | -                                          |
| onClick        | 点击气泡时触发                   | `() => void`                                                                                           | -                                          |
| edgeDistance   | 距离视口四边的最小安全距离       | `{ top: number; right: number; bottom: number; left: number }`                                         | `{ top: 0, right: 0, bottom: 0, left: 0 }` |
