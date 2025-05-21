---
nav:
  title: 组件
  order: 0
group:
  title: 表单控件
  order: 1
---

# SearchBar 搜索框

搜索场景的输入框组件。

## 示例

<code src="react-haki/demo/components/SearchBar/demo.tsx" title="受控组件"></code>

<code src="react-haki/demo/components/SearchBar/demo2.tsx" title="非受控组件"></code>

## SearchBar

### 属性

| 属性               | 说明                                               | 类型                      | 默认值       |
| ------------------ | -------------------------------------------------- | ------------------------- | ------------ |
| value              | 输入值                                             | `string`                  | -            |
| className          | 类名                                               | `string`                  | -            |
| searchIcon         | 左侧搜索图标                                       | `string`                  | -            |
| closeIcon          | 右侧清除图标                                       | `string`                  | -            |
| placeholder        | 提示文本                                           | `string`                  | `请输入内容` |
| autoFocus          | 自动聚焦                                           | `boolean`                 | `false`      |
| clearable          | 是否启用清除图标                                   | `boolean`                 | `true`       |
| shouldBlurOnSearch | 搜索时是否需要失焦                                 | `boolean`                 | `false`      |
| onCompositionStart | 开始输入合成时触发                                 | `() => void`              | -            |
| onCompositionEnd   | 输入合成结束时触发                                 | `(value: string) => void` | -            |
| onChange           | 输入框内容变化时触发                               | `(value: string) => void` | -            |
| onClick            | 点击输入框时触发                                   | `() => void`              | -            |
| onFocus            | 输入框聚焦时触发                                   | `() => void`              | -            |
| onClear            | 点击清除按钮或者是调用`ref`上的`clear`方法时会执行 | `() => void`              | -            |
| onSearch           | 输入框回车时触发                                   | `(value: string) => void` | -            |

### Ref

| 属性          | 说明             | 类型                       |
| ------------- | ---------------- | -------------------------- |
| blur          | 让输入框失去焦点 | `() => void`               |
| focus         | 让输入框获得焦点 | `() => void`               |
| clear         | 清空输入内容     | `() => void`               |
| nativeElement | 原始 input 元素  | `HtmlInputElement \| null` |
