<template>
  <div>
    <h1>{{$route.params}}</h1>
    <button @click="getLuckyNum">클릭</button>
    <h2>{{selectedLuckyNum}}</h2>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name:'TheLotto',
  data:function(){
    return {
      selectedLuckyNum:[],
    }
  },
  methods:{
    getLuckyNum : function(){
      const numbers = _.range(1,46)
      this.selectedLuckyNum = _.sampleSize(numbers,this.$route.params.lottoNumber)
    }
  },
}
</script>

<style>

</style>