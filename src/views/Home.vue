<template>
  <div class="home-page-wrap">
    <div class="banner-cont">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
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

<style lang="scss" scope>
.banner-cont {
  height: 600px;
  background-image: url('../assets/images/shouye/banner1.jpg');
  background-size: cover;
  background-position:center;
  background-repeat: no-repeat;
  position: relative;
  top: -100px;
  z-index: -1;
}
</style>
