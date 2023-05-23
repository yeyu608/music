<template>
  <div id="hotsearch">
    <div class="title vue2Font1">热门搜索</div>
    <div class="label">
      <span v-for="item in hotSearch" :key="item.id">{{ item.first }}</span>
    </div>
  </div>
</template>

<script>
import { hotSearch } from "@/http/api/search";
export default {
  data() {
    return {
      hotSearch: {},
    };
  },
  created() {
    this.getHotSearch();
  },
  methods: {
    getHotSearch() {
      if (sessionStorage.getItem("hotSearch")) {
        this.hotSearch = JSON.parse(sessionStorage.getItem("hotSearch"));
      } else {
        hotSearch("/search/hot", {}).then((res) => {
          this.hotSearch = res.data.result.hots;
          sessionStorage.setItem("hotSearch", JSON.stringify(res.data.result.hots));
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
#hotsearch {
  padding: 0 60px;
  .label {
    width: 100%;
    height: 800px;
    span{
        display: inline-block;
        margin: 50px 50px ;
    }
  }
}
</style>