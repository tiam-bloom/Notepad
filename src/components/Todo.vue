<template>
  <!-- animatecss动画: https://animate.style/ -->
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__bounceIn"
    leave-active-class="animate__bounceOut"
    appear
  >
    <div class="todo" @click="check(todo.id)">
      <!-- 父组件props传给子组件的数据最好只读, 所以不用 v-model绑定 -->
      <input type="checkbox" :checked="todo.done" />
      <span>{{ todo.text }}</span>
      <button @click.stop="delTodo(todo.id)">删除</button>
    </div>
  </transition>
</template>

<script>
// 引入css动画库 https://animate.style/
import "animate.css";
// 组件js
export default {
  name: "Todo",
  props: ["todo"],
  methods: {
    check(id) {
      this.upTodo(id);
    },
    delTodo(id) {
      if (confirm("确认删除吗?")) {
        this.$bus.$emit("delTodo", id);
      }
    },
    upTodo(id) {
      this.$bus.$emit("upTodo", id);
    },
  },
};
</script>

<style scoped>
/*  组件样式css */
.todo {
  padding: 15px 0;
  margin: 10px 0;
  letter-spacing: 0.1em;
}

.todo:hover {
  background-color: gray;
}

/* 使用CSS实现 */
button {
  display: none;
  margin-right: 10px;
  width: 70px;
  background-color: #e74c3c;
}
.todo:hover > button {
  display: inherit;
}
</style>