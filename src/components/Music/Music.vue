<template>
  <div id="music">
    <div class="search" @click="search()">
      <span class="iconfont icon-sousuo1">搜索</span>
    </div>
    <div class="title">
      <div class="title-left vue2Font1">推荐歌曲</div>
      <div class="title-right vue2Font2">
        更多 <span class="iconfont icon-jiantouyou"></span>
      </div>
    </div>
    <RecommenMusic></RecommenMusic>

    <div class="title">
      <div class="title-left vue2Font1">热门歌单</div>
      <div class="title-right vue2Font2">
        更多 <span class="iconfont icon-jiantouyou"></span>
      </div>
    </div>
    <HotList></HotList>
    <div class="title">
      <div class="title-left vue2Font1">官方歌单</div>
      <div class="title-right vue2Font2">
        更多 <span class="iconfont icon-jiantouyou"></span>
      </div>
    </div>
    <OfficialongList></OfficialongList>
    <div class="title">
      <div class="title-left vue2Font1">巅峰榜</div>
    </div>
    <ListItem></ListItem>
  </div>
</template>

<script>
import HotList from "./HotList.vue";
import RecommenMusic from "./RecommenMusic.vue";
import OfficialongList from "./OfficialongList.vue";
import ListItem from "./ListItem.vue";
export default {
  components: {
    RecommenMusic,
    HotList,
    OfficialongList,
    ListItem,
  },
  methods: {
    search(){
      this.$router.push("/Search")
    }
  }
};
</script>

<style scoped lang="less">
#music {
  .search {
    height: 140px;
    //background: #3fbf7f;
    line-height: 140px;
    border-radius: 140px;
    text-align: center;
    color: #ccc;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin:30px 0;
  }
}
</style>