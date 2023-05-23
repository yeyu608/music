<template>
  <div id="recommendedvideo" @click="goPlaymv(item.id)">
    <div class="top">
      <img :src="item.cover" alt="" />
      <!-- 播放次数 及 时间 -->
      <div class="videotime">
        <div class="v-left">
          <i class="iconfont icon-shipin1"></i>{{ playCoun }}
        </div>
        <div class="v-right">
          {{ playTime }}
        </div>
      </div>
    </div>
    <div class="bottom sc">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { playDetail } from "@/http/api/playmv";
export default {
  data() {
    return {
      durations:{}
    };
  },
  // 接收父组件的数据
  props: {
    // 和data一样 =>就是Vue会将props中的属性代理到this
    item: {
      type: Object,
    },
  },
  computed: {
    playCoun() {
      let data = 0;
      if (this.item.playCount >= 10000) {
        data = (this.item.playCount / 10000).toFixed(1) + "万";
      } else {
        data = this.item.playCount;
      }
      return data;
    },
    playTime() {
      let time = "";
      let second = this.durations / 1000;
      let minute = parseInt(second / 60);
      if (minute >= 10) {
        if (second % 60 >= 10) {
          return (time = `${minute}:${second % 60}`);
        } else {
          return (time = `${minute}:0${second % 60}`);
        }
      } else {
        if (second % 60 >= 10) {
          return (time = `0${minute}:${second % 60}`);
        } else {
          return (time = `0${minute}:0${second % 60}`);
        }
      }
    },
  },
  created() {
    this.getMvData(this.item.id);
  },
  methods: {
    goPlaymv(id) {
      this.$router.push({ path: "/palyMv", query: { id } });
    },
    getMvData(id) {
      playDetail("./mv/detail", { mvid: id }).then((res) => {
        if (res.data.code == 200) {
          this.durations = res.data.data.duration;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
#recommendedvideo {
  width: 48%;
  height: 700px;
  margin-top: 50px;
  .top {
    width: 100%;
    height: 500px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50px 50px 0 0;
    }
    .videotime {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: 20px;
      color: #fff;
      padding: 0 30px;
      font-size: 20px;
      align-items: center;
      .v-left {
        display: flex;
        align-items: center;
        i {
          font-size: 80px;
          margin-right: 20px;
        }
      }
    }
  }
  .bottom {
    padding: 10px 20px;
  }
}
</style>