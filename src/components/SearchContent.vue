<template>
  <div id="SearchC">
    <div class="search"><i class="iconfont icon-sousuo"></i>{{item.album.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    // 和data一样 =>就是Vue会将props中的属性代理到this
    item: {
      type: Object,
    },
  },
  created() {
  },
  methods: {
    
  },
};
</script>

<style scoped lang="less">
  #SearchC{
    .search{
      padding:60px 60px;
      i{
        margin-right: 40px;
        font-size: 80px;
      }
    }
  }
</style>>
</style>