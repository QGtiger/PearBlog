<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button type="primary" @click="handleTest">test</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      
    }
  },
  methods: {
    handleTest () {
      console.log(321)
      this.$axios.get('/hello/123').then(res=>{
        console.log(res)
      })
    }
  }
}
</script>
