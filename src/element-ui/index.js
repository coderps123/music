import Vue from "vue"

import {
  Button,
  Form,
  FormItem,
  Input,
  Pagination,
  Slider,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message
} from "element-ui"

Vue
  .use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Pagination)
  .use(Slider)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)

// 挂载到 vue 的实例原型对象上
Vue.prototype.$message = Message

