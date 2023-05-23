<template>
  <div id="hot_list">
    <dl class="hot" v-for="item in hotl" :key="item.id">
      <dt><img :src="item.coverImgUrl" /></dt>
      <dd class="vue2Font3 sc">{{ item.description }}</dd>
    </dl>
  </div>
</template>

<script>
import { RecommendMusic } from "@/http/api/music";
export default {
  data() {
    return {
      hotl: "",
    };
  },
  created() {
    this.getHot();
  },
  methods: {
    getHot() {
      if (sessionStorage.getItem("hotlist")) {
        this.hotl = JSON.parse(sessionStorage.getItem("hotlist"));
      } else {
        RecommendMusic("/top/playlist/highquality", { limit: 6 }).then(
          (res) => {
            if (res.data.code == 200) {
              this.hotl = res.data.playlists;
              sessionStorage.setItem("hotlist",JSON.stringify(res.data.playlists)
              );
            }
          }
        );
      }
    },
  },
};
</script>

<style scoped lang="less">
#hot_list {
  display: flex;
  // css :x抽滚动
  overflow-x: scroll;
  .hot {
    height: 800px;
    width: 500px;
    margin-right: 45px;
    dt {
      height: 500px;
      width: 500px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100px;
      }
    }
    dd {
      margin: 0;
    }
  }
}
</style>