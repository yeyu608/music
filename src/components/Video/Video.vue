<template>
  <div id="video">
    <!-- 布局 -->
    <div class="top" ref="tops">
      <div
        :class="activesTop == 0 ? 'activeStyle' : ''"
        @click="clickChange(0)"
      >
        推荐
      </div>
      <div
        :class="activesTop == 1 ? 'activeStyle' : ''"
        @click="clickChange(1)"
      >
        MV
      </div>
      <!-- props => div的属性 => 就是V-bind
      swipe => div => 操作的是虚拟dom => 
      @ => v-on: 绑定事件 @事件名称
      // vue 就是我们自己要操作真实dom ref
      语法：1、给需要的元素添加一个ref属性
            2、在Vue实例中通过this.$refs.ref(值)
 -->
    </div>
    <van-swipe
      class="my-swipe"
      ref="swipes"
      indicator-color="white"
      @change="changes"
    >
      <van-swipe-item>
        <div class="reVideo">
          <RecommendedVideo
            v-for="item in recommendedvideo"
            :key="item.id"
            :item="item"
          ></RecommendedVideo>
        </div>
      </van-swipe-item>
      <van-swipe-item
        ><div class="reVideo">
          <Mv v-for="item in mv" :key="item.id" :item="item"></Mv></div
      ></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import RecommendedVideo from "./RecommendedVideo.vue";
import Mv from "./Mv.vue";
import { RecommendMusic } from "@/http/api/music";
export default {
  data() {
    return {
      activesTop: 0,
      recommendedvideo: {},
      mv: {},
    };
  },
  components: {
    RecommendedVideo,
    Mv,
  },
  created() {
    // 写请求
    this.getrecvideo();
    this.getMv();
  },
  methods: {
    // 头部切换
    clickChange(value) {
      this.activesTop = value;
      // 点击头部切换 => 轮播图切换到指定位置 => 0 1
      this.$refs.swipes.swipeTo(value);
      // 获取到div真实dom
      //this.$refs.tops;
    },
    changes(index) {
      this.activesTop = index;
    },
    getrecvideo() {
      if (sessionStorage.getItem("recommendedvideo")) {
        this.recommendedvideo = JSON.parse(
          sessionStorage.getItem("recommendedvideo")
        );
      } else {
        RecommendMusic("/mv/exclusive/rcmd", {}).then((res) => {
          // 获取到后台的数据
          if (res.data.code == 200) {
            this.recommendedvideo = res.data.data;
            sessionStorage.setItem(
              "recommendedvideo",
              JSON.stringify(res.data.data)
            );
          }
        });
      }
    },
    getMv() {
      if (sessionStorage.getItem("mv")) {
        this.mv = JSON.parse(sessionStorage.getItem("mv"));
      } else {
        RecommendMusic("/personalized/mv", {}).then((res) => {
          // 获取到后台的数据
          if (res.data.code == 200) {
            this.mv = res.data.result;
            sessionStorage.setItem("mv", JSON.stringify(res.data.result));
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
#video {
  padding: 30px 0;
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    height: 100px;
    div {
      margin-right: 50px;
    }
    .activeStyle {
      font-size: 100px;
      font-weight: 600;
      border-bottom: 25px solid#3fbf7f;
    }
  }
  .my-swipe .van-swipe-item {
    font-size: 65px;
    .reVideo {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>