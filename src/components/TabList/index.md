---
nav:
  title: 组件
  order: 0
group:
  title: 导航
  order: 9
---

# TabList 标签列表

标签列表组件，常用于内容的切换展示场景。

## 示例

<code src="react-haki/demo/components/TabList/demo.tsx" title="标签列表"></code>

## TabList

### 属性

| 属性           | 说明                                   | 类型                              | 默认值 |
| -------------- | -------------------------------------- | --------------------------------- | ------ |
| className      | 类名                                   | `string`                          | -      |
| style          | 样式                                   | `React.CSSProperties`             | -      |
| items          | 标签列表（必填）                       | `TabItem[]`                       | -      |
| activeKey      | 激活的标签（必填）                     | `string \| number`                | -      |
| onChange       | 标签变化时回调（必填）                 | `(key: string \| number) => void` | -      |
| onAdd          | 添加标签时回调，不传则不会出现添加按钮 | `() => void`                      | -      |
| scrollDistance | 左右箭头的滚动距离                     | `number`                          | `800`  |

### 类型定义

```ts
interface TabItem {
  label: string;
  value: string | number;
  [key: string]: any;
}
```
