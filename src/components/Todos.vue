<template>
  <div>
    <!-- 组件结构HTML -->
    <Todo v-for="todo in todos" :key="todo.id" :todo="todo"></Todo>
  </div>
</template>

<script>
// 组件js
import Todo from "./Todo.vue";
export default {
  name: "Todos",
  components: {
    Todo,
  },
  props: ["todos"],
};
</script>

<style scoped>
/*  组件样式css */

</style>