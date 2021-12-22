<template>
  <div>
    <span @click="updateTodo(todo)" 
      style="cursor:grab"
      :class="{'is-completed':todo.isCompleted}"
    >{{todo.title}}</span>
    <button @click="deleteTodo(todo)">DELETE</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'TodoListItem',
  props:{
    todo:Object
  },
  // methods:{
  //   deleteTodo : function(){
  //     this.$store.dispatch('deleteTodo',this.todo)
  //   },
  //   updateTodo : function(){
  //     this.$store.dispatch('updateTodo',this.todo)
  //   }
  // }
  methods:{
    ...mapActions([
      'deleteTodo',
      'updateTodo',
    ])
  }
}
</script>

<style>
  .is-completed{
  text-decoration: line-through;  
}
</style>