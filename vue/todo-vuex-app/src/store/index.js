import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[]
  },
  mutations: {
    CREATE_TODO: function(state,todoItem){
      // console.log(todoItem)
      state.todos.push(todoItem)
    },
    DELETE_TODO:function(state,todoItem){
      
      state.todos =state.todos.filter((todo=>(todo!==todoItem)))

      // const index = state.todos.indexOf(todoItem)
      // state.todos.splice(index,1)
    },
    UPDATE_TODO: function(state,todoItem){
      state.todos = state.todos.map(todo=>{
        if (todo===todoItem){
          return {
            ...todo,
            isCompleted:!todo.isCompleted
          }          
        } else{
          return todo
        }
      })
      
      
    }
  },
  actions: {
    createTodo : function(context,todoItem){
      // console.log(context)
      // console.log(todoItem)
      context.commit('CREATE_TODO',todoItem)
    },
    deleteTodo : function({commit},todoItem){
      commit('DELETE_TODO',todoItem)
    },
    updateTodo : function({commit},todoItem){
      commit('UPDATE_TODO',todoItem)
    }
  },
  getters:{
    allCount : function(state){
      return state.todos.length
    },
    completedTodosCount: function(state){
      return state.todos.filter(todo=>{
        return todo.isCompleted === true
      }).length
    },
    uncompletedTodosCount : function(state){
      return state.todos.filter(todo=>{
        return todo.isCompleted === false
      }).length
    }
  },
  modules: {
  },
  plugins:[createPersistedState()],
})
