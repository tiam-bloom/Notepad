<template>
  <div class="todo-footer" v-show="totalTodos">
    <!-- 组件结构HTML -->
    <!-- <input type="checkbox" ref="checkbox" :checked="isAll" @change="checkAll"/> 已完成{{ doneTotal }} / 全部{{all}} -->
    <input type="checkbox" v-model="isAll" /> 已完成{{ doneTotal }} / 全部{{
      totalTodos
    }}
    <button @click="delAll">删除全部已完成</button>
  </div>
</template>

<script>
// 组件js
export default {
  name: "TodoFooter",
  props: ["todos"],
  computed: {
    totalTodos() {
      return this.todos.length;
    },
    doneTotal() {
      // reduce 数组条件筛选统计
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.totalTodos === this.doneTotal;
      },
      set(value) {
        this.todos.forEach((todo) => (todo.done = value));
      },
    },
  },
  methods: {
    delAll() {
      if (confirm("确定删除全部已完成吗？")) {
        this.$bus.$emit("delAllDone");
      }
    },
  },
};
</script>

<style scoped>
/*  组件样式css */
.todo-footer {
  padding: 5px;
  margin: 10px 0;
}
button {
  width: 138px;
  height: 38px;
  background-color: #d32f2f;
}
</style>