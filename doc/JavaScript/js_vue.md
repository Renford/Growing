Vue 是一套用于构建用户界面的可以自底向上逐层应用的渐进式框架。

在单文件组件中，整个文件都是一个 CommonJS 模块，里面包含了组件对应的 HTML (template)、组件内的处理逻辑 Javascript (scipte)、组件的样式 CSS (style)。在 script 标签中：

- data: 组件的初始化数据，以及私有属性
- props: 组件的属性，专门用来接收父子组件通信的数据
- computed: 组件的计算属性
- methods: 组件内的处理逻辑函数
- watch: 需要额外监听的属性
- components: 所用到的子组件
- 生命周期函数: beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、activated、deactivated、beforeDestroy、destroyed

## 1 基本使用

#### 1.1 模板语法

1. Class 与 Style

```
<!-- 1.对象语法 -->
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
data: {
  isActive: true,
  hasError: false
}

<!-- 2.数组语法 -->
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

2. 属性绑定 v-bind

```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

3. 事件绑定 v-on

```
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

事件修饰

```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

4. 表单绑定 v-model

```
<input v-model="searchText">

等价于

<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

双向绑定

```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

相关修饰符

```
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >

<!-- 自动将用户的输入值转为数值类型 -->
<input v-model.number="age" type="number">

<!-- 自动过滤用户输入的首尾空白字符 -->
<input v-model.trim="msg">
```

#### 1.2 计算属性

```
<div id="demo">{{ fullName }}</div>

computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

#### 1.3 监听属性

```
<div id="demo">{{ fullName }}</div>

watch: {
  firstName: function (val) {
    this.fullName = val + ' ' + this.lastName
  },
  lastName: function (val) {
    this.fullName = this.firstName + ' ' + val
  }
}
```

#### [slot 插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

## 2 组件

一个组件的 data 选项必须是一个函数，因为每个实例可以维护一份被返回对象的独立的拷贝

```
data: function () {
  return {
    count: 0
  }
}
```

#### 2.1 组件注册

组件名称可以是 `<my-component-name>` 或 `<MyComponentName>`，且建议为两个以上单词

1. 全局注册

注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中

```
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

2. 局部注册

```
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
}
```

3. 动态组件

在不同组件之间进行动态切换，可以通过 Vue 的 `<component>` 元素加一个特殊的 is 特性来实现。[具体事例](https://jsfiddle.net/chrisvfritz/Lp20op9o/)

```
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<!-- keep-alive 会将失活的组件将会缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

4. 异步组件

Vue 允许将组件定义为一个工厂函数，在组件需要渲染时触发工厂函数动态地解析组件，并且将结果缓存起来

```
Vue.component("async-component", function(resolve, reject){
    // async operation
    setTimeout(function() {
        resolve({
            template: '<div>something async</div>'
        });
    },1000);
});
```

动态组件可配合 webpack 实现代码分割，webpack 可以将代码分割成块，在需要此块时再使用 ajax 的方式下载

```
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

5. 递归组件

组件如果想在它们自己的模板中调用自身的，可以通过 name 选项来实现递归组件。递归调用必须是条件性的，因为可能导致无限循环。如下：

```
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```

这样写模板的话就会导致递归死循环，报错 “max stack size exceeded”。解决办法需要打破死循环，比如 v-if 返回 false。

## 3 过渡 && 动画

1. 过渡

transition 封装的组件，可以给任何元素和组件添加进入/离开过渡

- v-enter: 进入过渡的开始状态，
- v-enter-active: 进入过渡的生效时状态
- v-enter-to: 进入过渡的结束状态
- v-leave: 离开过渡的开始状态
- v-leave-active: 离开过渡的生效时状态
- v-leave-to: 离开过渡的结束状态

对应自定义过渡类名分别为 enter-class、enter-active-class、enter-to-class、leave-class、leave-active-class、leave-to-class

```
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

2. css 过渡（transition） && css 动画（animation）

CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。

```
<div id="example-1">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```
.slide-fade-enter-active {
  transition: all .3s ease; /* 过渡 */
  /* animation: bounce-in .5s; */ /* 动画 */
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  /* animation: bounce-in .5s; */
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
```

3. 过渡模式

- in-out：新元素先进行过渡，完成之后当前元素过渡离开
- out-in：当前元素先进行过渡，完成之后新元素过渡进入

## 4 混入

## 5 官方推荐库

Vuex

vue-router

MpVue

iview
wux
vant
