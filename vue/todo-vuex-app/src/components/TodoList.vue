<template>
  <div>
    <todo-list-item 
      v-for="todo in todos"
      :key="todo.date"
      :todo = "todo"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import TodoListItem from '@/components/TodoListItem.vue'
export default {
  name:'TodoList',
  components:{
    TodoListItem
  },
  computed: mapState(['todos'])
}

</script>

<style>

</style>