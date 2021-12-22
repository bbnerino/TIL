<template>
  <div>
    <input type="text"
    v-model.trim="todoTitle"
    @keyup.enter="createTodo"
    >
    <button @click="createTodo">제출</button>
  </div>
</template>

<script>
export default {
  name:'TodoForm',
  data:function(){
    return {
      todoTitle : '',
    }
  },
  methods:{
    createTodo: function(){
      const todoItem ={
        title : this.todoTitle,
        date : new Date().getTime(),
        isCompleted : false,
      }
      // console.log(this.todoTitle)
      // this.$store.commit('CREATE_TODO',todoItem)
      if (todoItem.title){
        this.$store.dispatch('createTodo',todoItem)
        this.todoTitle = ''
      }
    }
  }
}
</script>

<style>

</style>