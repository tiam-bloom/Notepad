<template>
  <div class="todo-header">
    <!-- 组件结构HTML -->
    <input
      type="text"
      v-model.trim="text"
      placeholder="请输入待办事项"
      @keyup.enter="addTodo"
    />
  </div>
</template>

<script>
// 组件js
export default {
  name: "TodoHeader",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    addTodo() {
      // 1. 获取输入的内容
      if (this.text === "") {
        alert("请先输入内容哦!");
        return;
      }
      // 2. 添加
      const todo = {
        id: Date.now(),
        text: this.text,
        done: false,
      };
      // 发送数据
      this.$bus.$emit("addTodo", todo);
      // 3. 清空输入框
      this.text = "";
    },
  },
};
</script>

<style scoped>
/*  组件样式css */

input {
  width: 97%;
  height: 30px;
  margin: 5px;
  text-indent: 0.5em;
  font-size: 1em;
  border-radius: 10px;
}
</style>