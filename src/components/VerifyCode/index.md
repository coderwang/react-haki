---
nav:
  title: 组件
  order: 0
group:
  title: 表单控件
  order: 1
order: 1
---

# VerifyCode 验证码

验证码组件，支持块状或者短横线样式，支持纯数字或者数字+英文组合验证。

## 示例

<code src="react-haki/demo/components/VerifyCode/demo.tsx" title="4位块状验证码（纯数字）"></code>

<code src="react-haki/demo/components/VerifyCode/demo2.tsx" title="6位短横线验证码（数字+英文）"></code>

## VerifyCode

### 属性

| 属性         | 说明                             | 类型                      | 默认值      |
| ------------ | -------------------------------- | ------------------------- | ----------- |
| value        | 验证码的值（必填）               | `string`                  | -           |
| onChange     | 值改变的回调（必填）             | `(value: string) => void` | -           |
| error        | 错误文案                         | `string`                  | -           |
| length       | 验证码长度                       | `number`                  | `4`         |
| type         | 块状或线状样式                   | `'block' \| 'line'`       | `'block'`   |
| inputMode    | 纯数字或数字+英文验证            | `'text' \| 'numeric'`     | `'numeric'` |
| isSubmitting | 是否正在验证，为 true 时无法修改 | `boolean`                 | `false`     |
| autoFocus    | 是否自动聚焦                     | `boolean`                 | `true`      |
| className    | 类名                             | `string`                  | -           |
| cursorStyle  | 模拟出来的光标的样式             | `React.CSSProperties`     | -           |
