<template>
  <div id="app">
    <h1>Todo List</h1>
    <h3>총 갯수:{{allCount}}개</h3>
    <h3>완료안된것:{{uncompletedTodosCount}}개</h3>
    <h3>완료된것:{{completedTodosCount}}개</h3>
    <todo-form></todo-form>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {
    TodoList,
    TodoForm
  },
  // computed:{
  //   completedTodosCount : function(){
  //     return this.$store.getters.completedTodosCount
  //   },
  //   allCount : function(){
  //     return this.$store.getters.allCount
  //   },
  //   uncompltedTodosCount : function(){
  //     return this.$store.getters.uncompltedTodosCount
  //   }
  // },
  computed:{
    ...mapGetters([
      'completedTodosCount',
      'uncompletedTodosCount',
      'allCount',
    ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
