<template>
  <div id="Off_songlist">
    <dl v-for="item in Officesong" :key="item.id">
      <dt><img :src="item.coverImgUrl" /></dt>
      <dd class="vue2Font3 sc">{{ item.name }}</dd>
    </dl>
  </div>
</template>

<script>
import { RecommendMusic } from "@/http/api/music";
export default {
  data() {
    return {
      Officesong: "",
    };
  },
  created() {
    this.getOffice();
  },
  methods: {
    getOffice() {
      if (sessionStorage.getItem("Officesong")) {
        this.Officesong = JSON.parse(sessionStorage.getItem("Officesong"));
      } else {
        RecommendMusic("/top/playlist", { limit: 6 }).then((res) => {
          if (res.data.code == 200) {
            this.Officesong = res.data.playlists;
            sessionStorage.setItem(
              "Officesong",
              JSON.stringify(res.data.playlists)
            );
          }
        });

        // console.log(this.hotl);
      }
    },
  },
};
</script>

<style scoped lang="less">
#Off_songlist {
  display: flex;
  overflow-x: scroll;
  dl {
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