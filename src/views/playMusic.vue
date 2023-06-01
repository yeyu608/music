<template>
  <div id="playmusic" v-if="musicdata">
    <!-- 背景层 -->
    <div
      class="back"
      :style="{ 'background-image': `url(${musicdata.al.picUrl})` }"
    ></div>
    <!-- 背景遮罩层 -->
    <div class="backgrounds"></div>
    <div class="head">
      <div class="nav">
        <i class="iconfont icon-back" @click="upStep(-1)"></i>|
        <i class="iconfont icon-zhuye" @click="upStep(-1)"></i>
      </div>
      <h3>{{ musicdata.name }}</h3>
      <p>{{ musicdata.ar[0].name }}</p>
    </div>
    <div class="content">
      <div class="playpup">
        <img :src="musicdata.al.picUrl" />
        <div class="playbtn" @click="playmis()">
          <div class="suspend iconfont icon-zanting" v-show="playMis"></div>
          <div class="play iconfont icon-bofang" v-show="!playMis"></div>
          <audio :src="songUrl" ref="audios"></audio>
        </div>
      </div>
      <!-- 歌词 -->
      <div class="lyricStyle" ref="lyricStyles">
        <div
          class="lyricItem"
          :class="activeIndex == index ? 'lyricActive' : ''"
          v-for="(item, index) in LyricAlist"
          :key="index"
          :data-index="index"
        >
          {{ item.Lyric }}
        </div>
      </div>
    </div>
    <!-- 有一个搜索和列表 -->
    <div class="serchlist">
      <div class="list">
        <i class="iconfont icon-liebiao"></i>
        <span>列表</span>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <span>搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "../components/Popup.vue";
import { Getlyric, Getlmusicdata, GetSongUrl } from "@/http/api/playmusic";
export default {
  data() {
    return {
      musicdata: "",
      playMis: false,
      songUrl: "",
      scrollLength: 0,
      // 歌词
      LyricAlist: [],
      idx: 0,
      activeIndex: 0,
      ztId:''
    };
  },

  components: {
    Popup,
  },

  created() {
    this.getlyric(this.$route.query.id);
    this.getmusicdata(this.$route.query.id);
    this.getsongurl(this.$route.query.id);
  },
  beforeRouteLeave(to,from,next){
    console.log(this.ztId)
    if (this.ztId !== this.$route.query.id) {
      this.$route.meta.keepAlive = false;
      console.log("dddd");
    }
    this.ztId = this.$route.query.id;
    console.log(this.ztId);
    this.$route.meta.keepAlive = true;
    next()
  },
  activated() {
    if (this.$refs.lyricStyles) {
      this.playMis = !this.playMis;
      this.$refs.lyricStyles.scrollTop = this.scrollLength;
      this.playmis();
    }
  },
  methods: {
    upStep(num) {
      this.$router.go(num);
    },
    // 获取歌词
    getlyric(id) {
      Getlyric("/lyric", { id }).then((res) => {
        // 处理歌词
        this.changeLyric(res.data.lrc.lyric);
      });
    },
    changeLyric(data) {
      // 1、将字符串变成数组
      let LyricA = data.split("\n");
      // 2、处理歌词和时间
      let arryData = []; //[{item:时间,Lyric:歌词}]
      let regMatch = /\d{2}:\d{2}.\d{2,3}/;
      for (let i = 0; i < LyricA.length - 1; i++) {
        arryData.push({
          time: this.timeFormat(LyricA[i].match(regMatch)[0]),
          Lyric: LyricA[i].split("]")[1],
        });
      }
      this.LyricAlist = arryData; // 处理好的歌词数据
      //console.log(arryData);
    },
    // 处理时间格式
    timeFormat(data) {
      //console.log(data);
      let m = parseInt(data.split(":")[0]);
      let s = parseInt(data.split(":")[1]);
      if (m !== "00") {
        // 分钟不等于00
        s += m * 60;
      }
      return Number(s);
    },
    // 获取歌曲详情
    getmusicdata(id) {
      Getlmusicdata("/song/detail", { ids: id }).then((res) => {
        this.musicdata = res.data.songs[0];
      });
    },
    // 获取音乐url
    getsongurl(id) {
      GetSongUrl("/song/url", { id }).then((res) => {
        this.songUrl = res.data.data[0].url;
      });
    },
    // 音乐播放
    playmis() {
      this.playMis = !this.playMis;
      if (this.playMis) {
        this.$refs.audios.play();
        // 实时监听信誉播放的进度
        this.$refs.audios.addEventListener("timeupdate", () => {
          // 获取到最新播放到哪里
          //console.log(this.$refs.audios.currentTime);
          // 处理动态样式 和 自动滚动
          this.changStyleSc(this.$refs.audios.currentTime);
        });
        this.$refs.audios.addEventListener("ended", () => {
          this.playMis = !this.playMis;
          this.autoscroll(ture);
          console.log("ccccc");
        });
      } else {
        this.$refs.audios.pause();
      }
    },
    changStyleSc(time) {
      //1、动态添加样式
      let item = this.LyricAlist[this.idx];
      // 获取到第一项歌词播放的时间
      // 获取当前的时间
      //console.log(item.time, time);
      if (time > item.time) {
        this.idx++;
        this.activeIndex = this.idx - 1;
      } else {
        return false;
      }
      // 实现自动滚动歌词
      this.autoscroll();
    },
    autoscroll(clear) {
      // 让div元素滚动到指定位置
      this.scrollLength += 32;
      this.$refs.lyricStyles.scrollTop = this.scrollLength;
      if (clear) {
        this.$refs.lyricStyles.scrollTop = 0;
      }
    },
  },
  watch: {},
};
</script>

<style scoped lang="less">
#playmusic {
  color: #fff;
  height: 100%;
  .back {
    width: 100%;
    height: 100%;
    background-position: center center;
    position: absolute;
    z-index: -5;
    filter: blur(50px);
  }
  .backgrounds {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .head {
    .nav {
      i {
        color: #fff;
      }
    }
    h3 {
      margin-bottom: 20px;
    }
    p {
      margin: 0;
    }
  }
  .content {
    margin: 120px auto 0;
    width: 100vw;
    position: relative;
    z-index: 100;
    .playpup {
      margin: 120px auto 0;
      width: 1000px;
      height: 1000px;
      position: relative;
      z-index: 100;
      img {
        width: 1000px;
        height: 1000px;
        border-radius: 100px;
      }
      .playbtn {
        z-index: 100;
        width: 200px;
        height: 200px;
        background: #fff;
        border-radius: 200px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .suspend,
        .play {
          font-size: 80px;
          color: #000;
        }
      }
    }
    // 歌词
    .lyricStyle {
      overflow-y: scroll;
      height: 800px;
      padding-top: 300px;
      margin-top: 80px;
      font-size: 72px;
      .lyricItem {
        text-align: center;
        color: #fff;
        margin: 60px 0;
      }
      .lyricActive {
        color: yellow;
      }
    }
  }
  .serchlist {
    height: 700px;
    width: 260px;
    border-radius: 260px;
    background: #fff;
    color: #000;
    position: absolute;
    right: 80px;
    bottom: 300px;
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    flex-direction: column;
    .list,
    .search {
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        font-size: 100px;
      }
      span {
        font-size: 60px;
      }
    }
  }
}
</style>