<template>
  <div id="search">
    <div class="head">
      <div class="nav">
        <i class="iconfont icon-back" @click="upStep(-1)"></i>|
        <i class="iconfont icon-zhuye" @click="upStep(-1)"></i>
      </div>
      <h3>QQ音乐</h3>
    </div>
    <div class="search1 vue2Font3">
      <i class="iconfont icon-sousuo"></i>
      <input
        type="text"
        @blur="getfocus(false)"
        @input="Upkey"
        @focus="getfocus(true)"
        placeholder="搜索 音乐/视频/歌手/歌单/电台"
        v-model="values"
        :values="values"
      />
      <span class="iconfont icon-quxiao" @click="getfocus" v-show="focused">&nbsp;&nbsp;取消</span>
    </div>
    <HotSearch v-show="!focused"></HotSearch>
    <p v-show="values && focused">搜索“{{ values }}”</p>
    <SearchContent v-show="focused&&values" v-for="item in Searchrecom" :key="item.id" :item="item"></SearchContent>
  </div>
</template>

<script>
import HotSearch from "../components/HotSearch.vue";
import SearchContent from "../components/SearchContent.vue";
import { hotSearch } from "@/http/api/search";
export default {
  data() {
    return {
      focused: "",
      values: "",
      /* 关键字的联想返回数据 */
      Searchrecom: "",
    };
  },
  components: {
    HotSearch,
    SearchContent,
  },
  created() {
    this.Upkey();
  },
  methods: {
    upStep(num) {
      this.$router.go(num);
    },
    getfocus(val) {
      this.focused = val;
      this.values = "";
    },
    Upkey() {
      hotSearch("/search", { keywords: this.values }).then((res) => {
        this.Searchrecom = res.data.result.songs;
        console.log(this.Searchrecom);
      });
    },
  },
};
</script>

<style scoped lang="less">
#search {
  .search1 {
    height: 200px;
    display: flex;
    align-items: center;
    padding: 0 120px;

    i {
      font-size: 80px;
      margin-right: 20px;
      color: #ccc;
    }
    input {
      flex: 1;
      padding: 0;
    }
    span {
      font-size: 60px;
    }
  }
  p{
    color: rgb(40, 161, 71);
    font-size: 100px;
  }
}
</style>