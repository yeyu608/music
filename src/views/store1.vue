<template>
  <div class="store">
    <h2>在页面(.vue文件获取仓库中方法=>操作仓库)使用属性方法</h2>
      <h3>我的{{this.$store.state.age}}</h3>
      <h2>我的姐姐{{this.$store.getters.bortherAge}}</h2>
      <h2>我的哥哥{{this.$store.getters.sAge}}</h2>
      <div @click="add">++</div>
      <div @click="adds">++</div>
  </div>
</template>

<script>
export default {
created(){
    console.log(this.$store);
},
methods: {
  add(){
    this.$store.commit('changeAge')
  },
  adds(){
    this.$store.dispatch('changeAge')
  }
}
}
</script>

<style>

</style>