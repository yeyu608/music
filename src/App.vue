<template>
  <div id="app">
    <router-view></router-view>
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
};
</script>

<style scoped  lang="less">
#app{
  height:100%;
}
</style>
