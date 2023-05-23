<template>
  <div id="recommenMusic">
    <dl class="recommen" v-for="item in recommenMusic" :key="item.id" @click="getmusic(item.id)">
      <dt><img :src="item.picUrl" /></dt>
      <dd class="flex1">
        <span class="vue2Font3">{{ item.name }}</span
        ><span>></span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { RecommendMusic } from "@/http/api/music";
export default {
  data() {
    return {
      recommenMusic: "",
    };
  },
  created() {
    this.getMusic();
  },
  methods: {
    getMusic() {
      if (sessionStorage.getItem("recommenMusic")) {
        this.recommenMusic = JSON.parse(sessionStorage.getItem("recommenMusic"));
      } else {
        RecommendMusic("/personalized/newsong", { limit: 6 }).then((res) => {
          if (res.data.code == 200) {
            this.recommenMusic = res.data.result;
            sessionStorage.setItem(
              "recommenMusic",
              JSON.stringify(res.data.result)
            );
          }
        });
      }
    },
    getmusic(id){
      this.$router.push({ path:"/playMusic",query:{id}})
    }
  },
};
</script>

<style scoped lang="less">
#recommenMusic {
  .recommen {
    height: 400px;
    display: flex;
    dt {
      height: 400px;
      width: 400px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50px;
      }
    }
    dd {
      margin-left: 40px;
      flex: 1;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>