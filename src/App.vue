<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// 根组件

export default {
  /* mounted(){
    RecommendMusic('/personalized/newsong',{limit:10}).then(res=>{
      let mc = res.data.result
      console.log(mc)
    })
  }, */
  data(){
    return{
     
    }
  },
  methods: {},
  watch: {
  },
};
</script>

<style scoped  lang="less">
#app {
  height: 100%;
}
</style>
