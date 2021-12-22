<template>
  <div class="home">
    <button @click="getSticker">가져오기</button>
    <div v-if="view===true" style="display:flex"  >
      <div v-for="pack in packageList" :key="pack.packageId">
        {{pack.packageName}}
        <img :src="`${pack.packageImg}`" alt="">
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'Home',
  data(){
      return {
      view:false,
      packageList : Object,
      }
    },
  methods: {
    getSticker : function () {
      this.view = true
      axios.get('https://messenger.stipop.io/v1/package?userId=xxx&pageNumber=1&country=kr', {
          headers: { apikey: '8e2b8a6e14a05c53f8b184edede34e8d' },
        })
        .then((response) => {
          console.log(response.data.body.packageList)
          this.packageList = response.data.body.packageList
          
        })
        .catch((error) => {
          console.warn(error);  
      })
    }
  },

  
}
</script>