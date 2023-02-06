<template>
  <div class="app">
    <TodoHeader></TodoHeader>
    <Todos :todos="todos"></Todos>
    <TodoFooter :todos="todos"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import Todos from "./components/Todos.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  name: "App",
  data() {
    return {
      todos: JSON.parse(window.localStorage.getItem("todos")),
    };
  },
  methods: {
    // 增加 
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    // 删除
    delTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    // 更新勾选状态
    upTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      });
    },
    // 删除所有done值为true的todo
    delAllDone() {
      this.todos = this.todos.filter((todo) => !todo.done);
    },
  },
  components: {
    TodoHeader,
    Todos,
    TodoFooter,
  },
  watch: {
    // 深度监视todos的改变
    todos: {
      deep: true,
      handler(val) {
        window.localStorage.setItem("todos", JSON.stringify(val));
        this.todos = val;
      },
    },
  },
  beforeCreate() {
    // 引入本地数据localStorage
    if (Object.prototype.hasOwnProperty.call(window.localStorage, "todos")) {
      return;
    }
    // 不存在创建默认值
    const todos = [
      { id: "001", text: "输入后回车添加待办事项", done: true },
      { id: "002", text: "By Tiam", done: false },
      { id: "003", text: "Date:【2022-11-30 16:43:13 星期三】", done: false },
    ];
    window.localStorage.setItem("todos", JSON.stringify(todos));
  },
  mounted() {
    this.$bus.$on("addTodo", this.addTodo);
    this.$bus.$on("delTodo", this.delTodo);
    this.$bus.$on("upTodo", this.upTodo);
    this.$bus.$on("delAllDone", this.delAllDone);
  },
  // 销毁前解绑事件
  beforeDestroy() {
    this.$bus.$off("addTodo", this.addTodo);
    this.$bus.$off("delTodo", this.delTodo);
    this.$bus.$off("upTodo", this.upTodo);
    this.$bus.$off("delAllDone", this.delAllDone);
  },
};
</script>

<style lang="less">
.app {
  width: 600px;
  margin: 100px auto 100px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;
  background-color: burlywood;

  button {
    float: right;
    color: white;
    border-radius: 5px;
    padding: 2px 4px;
  }
}
</style>