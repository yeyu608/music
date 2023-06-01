<template>
  <div class="playmmv">
    <div class="head">
      <div class="nav">
        <i class="iconfont icon-back" @click="upStep"></i>|
        <i class="iconfont icon-zhuye" @click="upStep"></i>
      </div>
      <h3>QQ音乐</h3>
    </div>
    <video :src="mv" controls></video>
    <div class="Mvdata">
      <h4>{{ playdata.name }}</h4>
      <p>{{ playdata.artistName }}上传</p>
      <p>{{ playcount() }}次播放&nbsp;{{ playdata.publishTime }}</p>
    </div>
    <div class="relatedVideo">
      <div class="title">相关视频</div>
      <div class="relatedMv">
        <dl
          v-for="item in relatedmv"
          :key="item.id"
          @click="goRelatedv(item.vid)"
        >
          <dt><img :src="item.coverUrl" alt="" /></dt>
          <dd>{{ item.title }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvUrl, playDetail, relatedMv } from "@/http/api/playmv";
export default {
  data() {
    return {
      mv: {},
      playdata: {},
      relatedmv: {},
    };
  },
  created() {
    if (sessionStorage.getItem("ids")) {
      this.goRelatedv(sessionStorage.getItem("ids"));
    } else {
      this.getmv(this.$route.query.id);
      this.getMvData(this.$route.query.id);
      this.getrelatedMv(this.$route.query.id);
      this.getrelatedVideD(this.$route.query.id)
    }
  },
  activated(){
    console.log("video")
  },
  methods: {
    getmv(id) {
      getMvUrl("/mv/url", { id }).then((res) => {
        if (res.data.code == 200) {
          this.mv = res.data.data.url;
        }
      });
    },
    getMvData(id) {
      playDetail("./mv/detail", { mvid: id }).then((res) => {
        if (res.data.code == 200) {
          this.playdata = res.data.data;
        }
      });
    },
    playcount() {
      if (this.playdata.playCount >= 10000) {
        return (this.playdata.playCount / 10000).toFixed(1) + "万";
      } else {
        return this.playdata.playCount;
      }
    },
    getrelatedMv(id) {
      relatedMv("/related/allvideo", { id }).then((res) => {
        this.relatedmv = res.data.data;
      });
    },
    upStep() {
      history.back();    
      this.$router.push({path: "/palyMv", query: { id:'sessionStorage.getItem("ids")'}})
    },

    // 相关视频本页刷新
    goRelatedv(id) {
      sessionStorage.setItem("ids", id);
      this.getrelatedMv(id);
      this.getrelatedVideD(id);
      this.getRv(id);
     // this.$router.push({path: "/palyMv", query: { id }})
      // this.publishTime();
    },
    // 重新获取到一个相关视频详情
    getrelatedVideD(id) {
      playDetail("/video/detail", { id: id }).then((res) => {
        if (res.data.code == 200) {
          this.playdata.publishTime =new Date(res.data.data.publishTime).toLocaleString();
          this.playdata.name = res.data.data.title;
          this.playdata.artistName = res.data.data.creator.nickname;
          console.log(res);
        }
      });
    },
    // 相关视频的上传时间
    /*  publishTime() {
      this.playdata.publishTime=new Date(this.playdata.publishTime).toLocaleString();
    }, */
    // 修改视频URL
    getRv(id) {
      getMvUrl("/video/url", { id }).then((res) => {
        if (res.data.code == 200) {
          this.mv = res.data.urls[0].url;
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.playmmv {
  video {
    width: 100%;
  }
  .Mvdata {
    padding: 0 60px;
    h4 {
      margin: 30px 0 50px 0;
    }
    p {
      margin: 0 0 20px 0;
      font-size: 30px;
    }
  }
  .relatedVideo {
    padding: 0 60px;
    .title {
      margin-top: 80px;
    }
    .relatedMv {
      dl {
        width: 100%;
        height: 400px;
        display: flex;
        dt {
          width: 700px;
          height: 400px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 60px;
          }
        }
        dd {
          flex: 1;
          padding: 30px 20px;
          margin-left: 30px;
        }
      }
    }
  }
}
</style>