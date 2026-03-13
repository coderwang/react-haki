---
nav:
  title: 组件
  order: 0
group:
  title: 动效组件
  order: 4
order: 2
---

# Carousel 走马灯

走马灯组件，支持左右滑动。

## 示例

<code src="react-haki/demo/components/Carousel/demo.tsx" title="走马灯"></code>

## Carousel

### 属性

| 属性       | 说明                     | 类型                      | 默认值      |
| ---------- | ------------------------ | ------------------------- | ----------- |
| className  | 类名                     | `string`                  | -           |
| style      | 根元素样式               | `React.CSSProperties`     | -           |
| children   | 子元素列表               | `React.ReactNode[]`       | -           |
| startDelay | 开始延迟时间，单位：毫秒 | `number`                  | `1000`      |
| direction  | 方向                     | `'forward' \| 'backward'` | `'forward'` |
| offset     | 偏移量，单位：px         | `number`                  | `0`         |

### Ref

| 属性 | 说明     | 类型                      |
| ---- | -------- | ------------------------- |
| prev | 回滚滑块 | `(count: number) => void` |
| next | 前进滑块 | `(count: number) => void` |
